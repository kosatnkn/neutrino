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

var express = require('express');
var app = express();


/*
|--------------------------------------------------------------------------
| Resolve and Add Dependency Injection Container
|--------------------------------------------------------------------------
|
*/

require('./../app/container')(app);


/*
|--------------------------------------------------------------------------
| Add Request Validator
|--------------------------------------------------------------------------
|
 */

require('./../app/validator')(app);


/*
 |--------------------------------------------------------------------------
 | Add Response Mapper
 |--------------------------------------------------------------------------
 |
 */

require('./../app/transport/response/mapper')(app);


/*
|--------------------------------------------------------------------------
| Async Error Handler
|--------------------------------------------------------------------------
|
 */

require('./../app/error/async_handler')(app);


/*
|--------------------------------------------------------------------------
| Add Middleware
|--------------------------------------------------------------------------
|
*/

// check whether input is JSON
require('./../app/middleware/reqest_type_middleware')(app);

// enable JSON body parsing
app.use(express.json());


/*
|--------------------------------------------------------------------------
| Add Router
|--------------------------------------------------------------------------
|
*/

require('./../app/router')(app);


/*
|--------------------------------------------------------------------------
| Add Error Handler
|--------------------------------------------------------------------------
|
| This will override the default error handler.
| NOTE: Should be added to the `app` as the last step in of the
|       bootstrapping process.
|
*/

require('./../app/error/handler')(app);


/*
|--------------------------------------------------------------------------
| Listen for Requests
|--------------------------------------------------------------------------
|
*/

app.listen(process.env.APP_PORT, function ()
{
    var logger = require('./../app/logger');

    logger.info("Neutrino");
    logger.debug("name     : " + process.env.APP_NAME);
    logger.debug("port     : " + process.env.APP_PORT);
    logger.debug("timezone : " + process.env.APP_TIMEZONE);
    logger.debug("mode     : " + (process.env.APP_DEBUG === 'true' ? "DEBUG" : "PRODUCTION"));
    logger.info(new Date().toString());
});



