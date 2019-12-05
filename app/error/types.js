const DomainErrorTypes = require('./../../domain/errors/types');

const ErrorTypes = {
    SERVER_ERROR: "ServerException",
    VALIDATION_ERROR: "ValidationException",
    UNKNOWN_ERROR: "UnknownException"
};

/**
 * Merge two objects together.
 *
 * @param obj
 * @param src
 * @returns {*}
 * @private
 */
function _merge(obj, src)
{
    for (let key in src)
    {
        if (src.hasOwnProperty(key))
        {
            obj[key] = src[key];
        }
    }

    return obj;
}

module.exports = _merge(ErrorTypes, DomainErrorTypes);