"use strict";

// prevent this file from executing directly
if (require.main === module)
{
    console.error('This file is not there to be executed directly. Please use server.js instead.');

    process.exit();
}

/*
|--------------------------------------------------------------------------
| Load Configurations
|--------------------------------------------------------------------------
|
*/

require('dotenv').config();


/*
|--------------------------------------------------------------------------
| Create App
|--------------------------------------------------------------------------
|
*/

const express = require('express');
let app = express();


/*
|--------------------------------------------------------------------------
| Add Prometheus metrics
|--------------------------------------------------------------------------
|
*/

if(process.env.APP_METRICS === 'true')
{
    const { createMiddleware } = require('@promster/express');

    let options = {
        accuracies: ['s'],
        metricTypes: ['httpRequestsTotal', 'httpRequestsHistogram'],
        normalizePath: function (path)
        {
            // remove query parameters from path
            path = path.split('?', 1)[0];

            // NOTE: order of execution of each replacement is important
            // replace json arrays with 'array'
            path = path.replace(/\[(.*?)\]/g, 'array');
            
            // replace floats with 'val'
            path = path.replace(/\d+\.\d*/g, 'val');

            // replace ints with 'id'
            path = path.replace(/\d+/g, 'id');

            return path;
        }
    };

    app.use(createMiddleware({ app, options }));
}


/*
|--------------------------------------------------------------------------
| Resolve and Add Dependency Injection Container
|--------------------------------------------------------------------------
|
*/

require('./app/container')(app);


/*
|--------------------------------------------------------------------------
| Add Request Validator
|--------------------------------------------------------------------------
|
*/

require('./app/validator')(app);


/*
|--------------------------------------------------------------------------
| Add Response Mapper
|--------------------------------------------------------------------------
|
*/

require('./app/transport/response/mapper')(app);


/*
|--------------------------------------------------------------------------
| Async Error Handler
|--------------------------------------------------------------------------
|
*/

require('./app/error/async_handler')(app);


/*
|--------------------------------------------------------------------------
| Add Middleware
|--------------------------------------------------------------------------
|
*/

// check whether input is JSON
require('./app/middleware/request_check_middleware')(app);

// alter the request with additional details
require('./app/middleware/request_alter_middleware')(app);

// enable JSON body parsing
app.use(express.json());


/*
|--------------------------------------------------------------------------
| Add Router
|--------------------------------------------------------------------------
|
*/

require('./app/router')(app);


/*
|--------------------------------------------------------------------------
| Add Error Handler
|--------------------------------------------------------------------------
|
| This will override the default error handler.
| NOTE: Should be added to the `app` as the last step of the
|       bootstrapping process.
|
*/

require('./app/error/handler')(app);


/*
 |--------------------------------------------------------------------------
 | Export decorated app object which can be used by process handler
 |--------------------------------------------------------------------------
 |
 */

module.exports = app;
