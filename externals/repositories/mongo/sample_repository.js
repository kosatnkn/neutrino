"use strict";

module.exports = (dbAdapter) => {

    const SampleModel = require('../mongo/models/sample_model')(dbAdapter);
    
    function create() {

        let sample = new SampleModel({
            name: "Sample Name",
            email: "sample@sample.com",
            password: "password",
            age: 20
        });

        sample.save((err, result) => {

            if(err) {
                
                console.log(err);
                return;
            }

            console.log(result);
        });
    }

    return {
        create: create
    }
}