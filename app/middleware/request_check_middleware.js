"use strict";

const serverError = require('../error/server_error');

const omittedRoutes = [
    '/metrics',
    '/favicon.ico'
];

function handle(req, res, next) {

    // omitted out routes
    if(omittedRoutes.indexOf(req.url) > -1) {
        
        next();

        return;
    }

    if('application/json' !== req.get('content-type')) {
        throw serverError("API only accepts JSON");
    }

    next();
}

module.exports = (app) => {
    app.use(handle);
};
