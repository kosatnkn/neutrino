/*
 |--------------------------------------------------------------------------
 | Application Process Handler
 |--------------------------------------------------------------------------
 |
 | This script is used to create application threads and initialize app on them.
 | Master process is responsible for managing forks, and export app metrics.
 |
 */

const express = require('express');
const os = require('os');
const app = require('./app');
const logger = require('./app/logger');

let isClusterMode = (process.env.APP_CLUSTER === 'true');

// create dedicated HTTP server to expose application metrics
let isMetricsEnabled = (process.env.APP_METRICS === 'true');
let metricsPort = process.env.APP_METRICS_PORT;
let metricsPath = process.env.APP_METRICS_ROUTE || '/metrics';
let metricsServer = express();

// create the toast message for application startup
let toast = "name - "  + process.env.APP_NAME +
    ", port - " + process.env.APP_PORT +
    ", timezone - " + process.env.APP_TIMEZONE +
    ", mode - " + (process.env.APP_DEBUG === 'true' ? "DEBUG" : "PRODUCTION") +
    ", metrics_port - " + (process.env.APP_METRICS === 'true' ? metricsPort : "DISABLED") +
    ", metrics_route - " + (process.env.APP_METRICS === 'true' ? metricsPath : "DISABLED");


// start the application in cluster mode
if(isClusterMode)
{
    const cluster = require('cluster');

    let pids = [];
    let numCPUs = os.cpus().length;

    if(cluster.isMaster)
    {
        // add additional data to toast for the master instance
        let toastMaster = toast + ", cluster - ENABLED" +
                            ", cluster_workers - " + numCPUs +
                            ", cluster_process - MASTER" +
                            ", cluster_process_status - STARTED" +
                            ", cluster_process_id - " + process.pid;

        logger.info(toastMaster);

        // fork workers
        for (let i = 0; i < numCPUs; i++)
        {
            pids.push(cluster.fork().process.pid);
        }

        // handle exited worker processes
        cluster.on('exit', function(worker, code, signal)
        {
            // add additional data to toast for worker instance
            let toastWorker = toast + ", cluster - ENABLED" +
                                ", cluster_workers - " + numCPUs +
                                ", cluster_process - WORKER" +
                                ", cluster_process_status - TERMINATED" +
                                ", cluster_process_id - " + process.pid;


            logger.error(toastWorker);

            // replace the terminated worker
            cluster.fork();
        });


        // export cluster metrics
        if(isMetricsEnabled)
        {
            const AggregatorRegistry = require('prom-client').AggregatorRegistry;
            
            let aggregatorRegistry = new AggregatorRegistry();

            metricsServer.get(metricsPath, function(req, res)
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

            metricsServer.listen(metricsPort);
        }

        return;
    }

    // add additional data to toast for worker instance
    let toastWorker = toast + ", cluster - ENABLED" +
                        ", cluster_workers - " + numCPUs +
                        ", cluster_process - WORKER" +
                        ", cluster_process_status - STARTED" +
                        ", cluster_process_id - " + process.pid;

    // workers can share any TCP connection
    // listen for requests in worker mode
    app.listen(process.env.APP_PORT, function ()
    {
        logger.info(toastWorker);
    });

    return;
}

if(isMetricsEnabled)
{
    // export single worker metrics
    const { getContentType, getSummary } = require('@promster/express');

    metricsServer.get(metricsPath, function(req, res)
    {
        res.statusCode = 200;

        res.setHeader('Content-Type', getContentType());
        res.end(getSummary());
    });

    metricsServer.listen(metricsPort);
}

// Listen for requests
app.listen(process.env.APP_PORT, function ()
{
    logger.info(toast);
});
