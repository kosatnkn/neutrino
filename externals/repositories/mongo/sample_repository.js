"use strict";

module.exports = (dbAdapter) => {

    const SampleModel = require('../mongo/models/sample_model')(dbAdapter);
    
    function create(resultCallback) {

        let sample = new SampleModel({
            name: "Sample Name",
            email: "sample@sample.com",
            password: "password",
            age: 20
        });

        sample.save((err, result) => {

            if(err) {
                return resultCallback(err, null);
            }

            return resultCallback(null, result);
        });
    }

    return {
        create: create
    }
}