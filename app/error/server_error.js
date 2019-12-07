"use strict";

const ErrorTypes = require('./types');

module.exports = function (message, code)
{
    let err = new Error(message);
    err.name = ErrorTypes.SERVER_ERROR;
    err.code = code;

    return err;
};