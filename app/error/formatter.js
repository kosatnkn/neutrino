const ErrorTypes = require('./types');
const ResponseCodes = require('./../transport/response/codes');

// TODO: remove enveloping

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
    var error = {
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
        code: ResponseCodes.HTTP_BAD_REQUEST,
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
    var details = {
        "errors": err.details
    };

    return {
        code: ResponseCodes.HTTP_UNPROCESSABLE,
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
    var error = {
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
        code: ResponseCodes.HTTP_SERVER_ERROR,
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
    var error = {
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
        code: ResponseCodes.HTTP_SERVER_ERROR,
        message: message
    };
}


module.exports = {
    format: format
};