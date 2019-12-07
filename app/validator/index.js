"use strict";

const validationError = require('./validation_error');
const validator = require('validate.js');

function validate(data, rules)
{
    let details = validator.validate(data, rules);

    if(details !== undefined)
    {
        let err = validationError();
        err.details = details;

        throw err;
    }

    return true;
}


module.exports = function (app)
{
    app.set('validator', {
        validate: validate
    });
};