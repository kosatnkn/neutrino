"use strict";

const validator = require('validate.js');
const errors = require('./errors');

/**
     * Check whether configurations are valid.
     * 
     * @param {*} config 
     */
    function validateConfig(config) {

        let rules = {
            user: {
                presence: true,
                length: {
                    minimum: 1
                }
            },
            host: {
                presence: true,
                length: {
                    minimum: 1
                }
            },
            database: {
                presence: true,
                length: {
                    minimum: 1
                }
            },
            password: {
                presence: true,
                length: {
                    minimum: 1  
                }
            },
            port: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            }
        };

        let details = validator.validate(config, rules);

        if(details === undefined) {
            return;
        }

        throw errors.configError(details);
    }

module.exports = {
    validateConfig: validateConfig
}