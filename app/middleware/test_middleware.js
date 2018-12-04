var logger = require('./../logger');

function _handle(req, res, next)
{
    logger.help("LOGGED: " + new Date());
    next();
}

module.exports = function (app)
{
    app.use(_handle);
};
