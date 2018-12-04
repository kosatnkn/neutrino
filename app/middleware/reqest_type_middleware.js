const serverError = require('./../error/server_error');

function _handle(req, res, next)
{
    if(req.get('content-type') !== 'application/json')
    {
        throw serverError("API only accepts JSON");
    }

    next();
}

module.exports = function (app)
{
    app.use(_handle);
};
