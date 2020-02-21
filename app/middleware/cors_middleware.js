"use strict";

const cors = require('cors');

let options = {
    origin: "*",
    optionsSuccessStatus: 200   // some legacy browsers (IE11, various SmartTVs) choke on 204
};

function handle(req, res, next) {

    cors(options);
    
    return next();
}

module.exports = (app) => {
    app.use(handle);
};
