"use strict";

module.exports = (config) => {
    
    const pg = require("pg");
    const validator = require('./validator');
    const errors = require('./errors');

    // known error codes sent from postgres
    const ErrorCodes = {
        CONNECTION_ERROR: '28P01',
        DATABASE_NOT_FOUND: '3D000',
        CONNECTION_REFUSED: 'ECONNREFUSED'
    };

    // check whether configuration values are valid
    validator.validateConfig(config);

    // create db pool
    let pool = _getPool(config);

    /**
     * Run a query.
     * 
     * @param {string} query 
     * @param {*} parameters 
     * @param {Function} resultCallback 
     */
    function query(query, parameters, resultCallback) {

        pool.query(query, parameters, (err, result) => {
            
            if(err) {
                return resultCallback(_getError(err), null);
            }

            return resultCallback(false, result);
        });
    }

    /**
     * Get the database pool.
     * 
     * @param {*} config 
     */
    function _getPool(config) {

        return new pg.Pool({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password,
            port: config.port,

            // number of milliseconds to wait before timing out when connecting a new client
            // by default this is 0 which means no timeout
            connectionTimeoutMillis: 0,
            
            // number of milliseconds a client must sit idle in the pool and not be checked out
            // before it is disconnected from the backend and discarded
            // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
            idleTimeoutMillis: 10000,
            
            // maximum number of clients the pool should contain
            // by default this is set to 10.
            max: 10
        });
    }

    /**
     * Translate a postgres error to a standard DBAdapter error.
     * 
     * @param {Error} err 
     */
    function _getError(err) {

        switch(err.code) {
            
            case ErrorCodes.CONNECTION_ERROR:
                return errors.connectionError();
            case ErrorCodes.CONNECTION_REFUSED:
                return errors.connectionError();
            case ErrorCodes.DATABASE_NOT_FOUND:
                return errors.connectionError();
            default:
                return errors.unknownError();
        }
    }

    return {
        query: query
    }
};
