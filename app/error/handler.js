"use strict";

const formatter = require('./formatter');
const logger = require('./../logger');

/**
 * Handle error.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @private
 */
function handle(err, req, res, next) {
    
    let formattedError = formatter.format(err);

    logger.error(err.stack);
    res.status(formattedError.code).json(formattedError.message);

    next();
}


module.exports = (app) => {
    app.use(handle);
};
