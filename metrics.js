"use strict";

/*
* Create dedicated HTTP server to expose application metrics.
*/
module.exports = (config) => {

    const express = require('express');
    const httpStatus = require('http-status-codes')
    const logger = require('./app/logger');
    
    let metricsServer = express();

    /**
     * Start a metric server for a single threaded service.
     */
    function startMetricServer() {

        const { getContentType, getSummary } = require('@promster/express');

        metricsServer.get(config.path, (req, res) => {

            res.statusCode = httpStatus.OK;

            res.setHeader('Content-Type', getContentType());
            res.end(getSummary());
        });

        metricsServer.listen(config.port);

        let metrics = `Metrics are exposed on port ${config.port} \nMetric path is '${config.path}'`;
        logger.prompt(metrics);
    }

    /**
     * Start a metric server for clustered service.
     */
    function startClusterMetricServer() {

        const AggregatorRegistry = require('prom-client').AggregatorRegistry;
            
        let aggregatorRegistry = new AggregatorRegistry();

        metricsServer.get(config.path, (req, res) => {

            aggregatorRegistry.clusterMetrics((err, metrics) => {

                if(err) {
                    logger.error(err);
                }

                res.set('Content-Type', aggregatorRegistry.contentType);
                res.send(metrics);
            });
        });

        metricsServer.listen(config.port);

        let metrics = `Metrics are exposed on port ${config.port} \nMetric path is '${config.path}'`;
        logger.prompt(metrics);
    }

    return {
        startMetricServer: startMetricServer,
        startClusterMetricServer: startClusterMetricServer
    };
}