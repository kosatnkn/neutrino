const ErrorTypes = require('./../error/types');

module.exports = function ()
{
    var err = new Error();
    err.name = ErrorTypes.VALIDATION_ERROR;

    return err;
};