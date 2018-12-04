var postgres = require('./../../externals/adapters/db/postgres');

function resolve(container)
{
    container.adapters = {
        db: postgres({
            host: process.env.DB_POSTGRES_HOST,
            port: process.env.DB_POSTGRES_PORT,
            database: process.env.DB_POSTGRES_DATABASE,
            user: process.env.DB_POSTGRES_USER,
            password: process.env.DB_POSTGRES_PASSWORD
        })
    }
}

module.exports = {
    resolve: resolve
};