"use strict";

const serverError = require('./../../../app/error/server_error');

function unknownError() {
    return serverError("Unknown database adapter error", 0);
}

function connectionError() {
    return serverError("Error connecting to database", 0);
}

function queryExecutionError() {
    return serverError("Error executing query", 0);
}

module.exports = {
    unknownError: unknownError,
    connectionError: connectionError,
    queryExecutionError: queryExecutionError
};