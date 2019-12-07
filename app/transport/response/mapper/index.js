"use strict";

const _mapper = require('./_mapper');
const _transformer = require('./_transformer');

module.exports = (app) => {
    
    app.set('response_mapper', {
        map: _mapper.map,
        transform: _transformer.transform
    });
};
