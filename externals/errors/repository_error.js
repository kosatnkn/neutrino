"use strict";

const ErrorTypes = require('./types');

module.exports = (message, code) => {
    
    let err = new Error(message);
    err.name = ErrorTypes.REPOSITORY_ERROR;
    err.code = code;

    return err;
};