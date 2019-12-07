"use strict";

/*
* Create dedicated HTTP server to expose application metrics.
*/
module.exports = function(config)
{
    const express = require('express');
    const logger = require('./app/logger');

    let metricsServer = express();

    /**
     * Start a metric server for a single threaded service.
     */
    function startMetricServer()
    {
        const { getContentType, getSummary } = require('@promster/express');

        metricsServer.get(config.path, function(req, res)
        {
            res.statusCode = 200;

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
    function startClusterMetricServer()
    {
        const AggregatorRegistry = require('prom-client').AggregatorRegistry;
            
        let aggregatorRegistry = new AggregatorRegistry();

        metricsServer.get(config.path, function(req, res)
        {
            aggregatorRegistry.clusterMetrics(function(err, metrics)
            {
                if(err)
                {
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