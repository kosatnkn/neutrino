"use strict";

/**
 * Transform as a single data structure.
 * 
 * @param {*} data 
 * @param {*} transformer 
 * @param {*} asCollection 
 */
function transform(data, transformer, asCollection) {

    asCollection = asCollection || false;

    if(asCollection) {
        return _transformCollection(data, transformer);
    }

    return transformer.transform(data);
}

/**
 * Transform as a collection of data structures.
 * 
 * @param {*} data 
 * @param {*} transformer 
 */
function _transformCollection(data, transformer) {

    let collection = [];

    data.forEach(function(datum) {
        collection.push(transformer.transform(datum));
    });

    return collection;
}

module.exports = {
    transform: transform
};