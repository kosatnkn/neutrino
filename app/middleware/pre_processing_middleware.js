const serverError = require('./../error/server_error');
let uuidv1 = require('uuid/v1');

function handle(req, res, next)
{
    req.uuid = uuidv1();

    next();
}

module.exports = function (app)
{
    app.use(handle);
};

