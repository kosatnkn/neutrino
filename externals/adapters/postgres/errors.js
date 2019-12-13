"use strict";

const serverError = require('../../../app/error/server_error');

function unknownError() {
    return serverError("Unknown database adapter error", 0);
}

function configError(details) {
    return serverError(`DB config error ${JSON.stringify(details)}`, 0);
}

function connectionError() {
    return serverError("Error connecting to database", 0);
}

function queryExecutionError() {
    return serverError("Error executing query", 0);
}

module.exports = {
    unknownError: unknownError,
    configError: configError,
    connectionError: connectionError,
    queryExecutionError: queryExecutionError
};