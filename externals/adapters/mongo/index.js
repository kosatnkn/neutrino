"use strict";

module.exports = (config) => {
    
    const mongoose = require('mongoose');
    // const validator = require('./validator');
    
    // validate configurations
    // validator.validateConfig(config);

    // create db pool
    let pool = _getPool(config);

    /**
     * Get a model using the schema.
     * 
     * @param {String} name 
     * @param {*} schema 
     */
    function getModel(name, schema) {
        return pool.model(name, schema);
    }

    /**
     * Get the database pool.
     * 
     * @param {*} config 
     */
    function _getPool(config) {

        let connectionString = `mongodb://${config.host}:${config.port}`;
        // let connectionString = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

        // NOTE: configure mongoose connection pool
        // https://mongoosejs.com/docs/connections.html
        let options = {
            user: config.user,
            pass: config.password,
            dbName: config.db,
            poolSize: config.pool,

            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        }

        mongoose.connect(connectionString, options)
        .catch((err) => {
            throw err;
        });

        return mongoose.connection;
    }

    return {
        getModel: getModel
    }
}