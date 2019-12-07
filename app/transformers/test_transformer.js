"use strict";

function transform(datum) {
    
    return {
        testId: datum.id,
        testName: datum.name
    };
}

module.exports = {
    transform: transform
};