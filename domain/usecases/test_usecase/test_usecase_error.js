var domainError = require('./../../errors/domain_error');

function testError()
{
    return domainError("test error", 0);
}

module.exports = {
    testError: testError
};