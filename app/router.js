"use strict";

const cors = require('cors');
const InfoController = require('./controllers/info_controller');
const TestController = require('./controllers/test_controller');

module.exports = (app) => {
    
    // constructor ___
    const infoController = InfoController(app);
    const testController = TestController(app);
    
    // enable preflight for all routes
    app.options('*', cors());

    // api info
    app.get('/', infoController.getInfo);

    app.get('/test', testController.testControllerMethod);
    app.get('/error', testController.testControllerErrorMethod);
    app.post('/validate', testController.testControllerValidateMethod);
    app.post('/db', testController.testDatabase);
    app.post('/transform', testController.testTransformData);
};
