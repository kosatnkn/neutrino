"use strict";

const formatter = require('./formatter');
const logger = require('./../logger');

/**
 * Handle async error.
 *
 * @param err
 * @param res
 */
function handle(err, res) {
    
    let formattedError = formatter.format(err);

    logger.error(err.stack);
    res.status(formattedError.code).json(formattedError.message);
}


module.exports = (app) => {
    
    app.set('async_error_handler', {
        handle: handle
    });
};
