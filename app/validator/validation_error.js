"use strict";

const ErrorTypes = require('./../error/types');

module.exports = () => {
    
    let err = new Error();
    err.name = ErrorTypes.VALIDATION_ERROR;

    return err;
};