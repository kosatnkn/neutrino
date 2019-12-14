"use strict";

module.exports = (config) => {
    
    const mongoose = require('mongoose');
    
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

        let connectionString = `mongodb://localhost:${config.port}/${config.database}`;

        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
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