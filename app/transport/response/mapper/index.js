var _mapper = require('./_mapper');
var _transformer = require('./_transformer');

module.exports = function (app)
{
    app.set('response_mapper', {
        map: _mapper.map,
        transform: _transformer.transform
    });
};
