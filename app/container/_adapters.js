"use strict";

const postgres = require('./../../externals/adapters/postgres');

function resolve(container) {
    
    container.adapters = {
        db: postgres({
            host: process.env.DB_POSTGRES_HOST,
            port: process.env.DB_POSTGRES_PORT,
            database: process.env.DB_POSTGRES_DATABASE,
            user: process.env.DB_POSTGRES_USER,
            password: process.env.DB_POSTGRES_PASSWORD,
            pool: process.env.DB_POSTGRES_POOL
        })
    }
}

module.exports = {
    resolve: resolve
};