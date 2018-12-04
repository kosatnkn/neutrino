var formatter = require('./formatter');
var logger = require('./../logger');


/**
 * Handle error.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @private
 */
function handle(err, req, res, next)
{
    var formattedError = formatter.format(err);

    logger.error(err.stack);
    res.status(formattedError.code).json(formattedError.message);

    next();
}


module.exports = function (app)
{
    app.use(handle);
};
