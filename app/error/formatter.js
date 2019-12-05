const ErrorTypes = require('./types');
const ResponseCodes = require('http-status-codes');

/**
 * Format error.
 *
 * @param err
 * @returns {{code, message}|*}
 * @private
 */
function format(err)
{
    switch(err.name)
    {
        case ErrorTypes.DOMAIN_ERROR:
            return _formatDomainError(err);

        case ErrorTypes.VALIDATION_ERROR:
            return _formatValidationError(err);

        case ErrorTypes.SERVER_ERROR:
            return _formatServerError(err);

        default:
            return _formatUnknownError(err);
    }
}


/**
 * Format domain error.
 *
 * @param err
 * @returns {{code: number, message: string}}
 * @private
 */
function _formatDomainError(err)
{
    let error = {
        "message": err.message,
        "code": err.code,
        "type": err.name
    };

    if(process.env.APP_DEBUG === 'true')
    {
        error.trace = err.stack;
    }

    var message = {
        "errors": [error]
    };

    return {
        code: ResponseCodes.BAD_REQUEST,
        message: message
    };
}


/**
 * Format validation error.
 *
 * @param err
 * @returns {{code: number, message: string}}
 * @private
 */
function _formatValidationError(err)
{
    let details = {
        "errors": err.details
    };

    return {
        code: ResponseCodes.UNPROCESSABLE_ENTITY,
        message: details
    };
}


/**
 * Format server error.
 *
 * @param err
 * @returns {{code: number, message: string}}
 * @private
 */
function _formatServerError(err)
{
    let error = {
        "message": err.message,
        "code": err.code,
        "type": err.name
    };

    if(process.env.APP_DEBUG === 'true')
    {
        error.trace = err.stack;
    }

    let message = {
        "errors": [error]
    };

    return {
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: message
    };
}


/**
 * Format unknown error.
 *
 * @param err
 * @returns {{code: number, message: string}}
 * @private
 */
function _formatUnknownError(err)
{
    let error = {
        "message": err.message,
        "code": err.code,
        "type": err.name
    };

    if(process.env.APP_DEBUG === 'true')
    {
        error.trace = err.stack;
    }

    let message = {
        "errors": [error]
    };

    return {
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: message
    };
}


module.exports = {
    format: format
};