"use strict";

const testRepository = require('./../../externals/repositories/postgres/test_repository');

function resolve(container) {
    
    container.repositories = {
        test: testRepository(container.adapters.db)
    }
}

module.exports = {
    resolve: resolve
};