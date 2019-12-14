"use strict";

const config = {
    host: "localhost",
    port: 27017,
    database: "test",
    user: "",
    password: ""
};    

const dbAdapter = require('./externals/adapters/mongo')(config);
const sampleRepository = require('./externals/repositories/mongo/sample_repository')(dbAdapter);

sampleRepository.create();
