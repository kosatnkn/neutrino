var _adapters = require('./_adapters');
var _repositories = require('./_repositories');
var _services = require('./_services');

var _container = {};


/**
 * resolve all dependencies and return the container.
 *
 * @returns _container
 * @private
 */
function _resolve()
{
    // low level dependencies need to be resolved first
    _adapters.resolve(_container);
    _repositories.resolve(_container);
    _services.resolve(_container);
}


module.exports = function (app)
{
    _resolve();
    app.set('container', _container);
};
