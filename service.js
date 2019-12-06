/*
 |--------------------------------------------------------------------------
 | Application Process Handler
 |--------------------------------------------------------------------------
 |
 | This script is used to create application threads and initialize app on them.
 | Master process is responsible for managing forks, and export app metrics.
 |
 */

const os = require('os');
const app = require('./app');
const logger = require('./app/logger');
const splash = require('./app/splash');

let isMetricsEnabled = (process.env.APP_METRICS === 'true');
let metrics = null;

if(isMetricsEnabled)
{
    let metricConfig = {
        port: process.env.APP_METRICS_PORT,
        path: process.env.APP_METRICS_ROUTE || '/metrics'
    };

    metrics = require('./metrics')(metricConfig);
}

let isClusterMode = (process.env.APP_CLUSTER === 'true');

let info = `
${splash.Default}

Service started on port ${process.env.APP_PORT}
Service timezone is '${process.env.APP_TIMEZONE}'
Running on '${process.env.APP_DEBUG === 'true' ? "DEBUG" : "PRODUCTION"}' mode`;

// start the application in cluster mode
// NOTE: The cluster mode's fork will create a new thread and initialize a 
// new instance of the app in that thread. Which means every fork will run 
// this entire script from beginning to end. That is why the cluster mode
// `if(isClusterMode)` block and `if(cluster.isMaster)` have returns.
if(isClusterMode)
{
    const cluster = require('cluster');

    let pids = [];
    let numCPUs = os.cpus().length;

    if(cluster.isMaster)
    {
        logger.prompt(info);
        
        // fork workers
        for (let i = 0; i < numCPUs; i++)
        {
            pids.push(cluster.fork().process.pid);
        }

        // handle exited worker processes
        cluster.on('exit', function(worker, code, signal)
        {
            logger.error(`Terminated WORKER, process ID: ${process.pid}`);

            // replace the terminated worker
            cluster.fork();
        });

        // export cluster metrics
        if(isMetricsEnabled)
        {
            metrics.startClusterMetricServer();
        }

        logger.prompt("Cluster mode ENABLED");
        logger.prompt(`Using ${numCPUs} CPUs`);
        logger.info(`Started MASTER, process ID: ${process.pid}`);

        return;
    }

    // workers can share any TCP connection
    // listen for requests in worker mode
    app.listen(process.env.APP_PORT, function ()
    {
        logger.info(`Started WORKER, process ID: ${process.pid}`);
    });

    return;
}

// start application in single threaded mode
logger.prompt(info);

// export single threaded mode metrics
if(isMetricsEnabled)
{
    metrics.startMetricServer();
}

// listen for requests
app.listen(process.env.APP_PORT, function ()
{
    logger.prompt(`Process ID: ${process.pid}`);
});
