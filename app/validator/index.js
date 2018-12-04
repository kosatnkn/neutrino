var validationError = require('./validation_error');
var validator = require('validate.js');


function validate(data, rules)
{
    var details = validator.validate(data, rules);

    if(details !== undefined)
    {
        var err = validationError();
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