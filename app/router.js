module.exports = function (app)
{
    // constructor ___
    const infoController = require('./controllers/info_controller')(app);
    const testController = require('./controllers/test_controller')(app);

    // api info
    app.get('/', infoController.getInfo);

    app.get('/test', testController.testControllerMethod);
    app.get('/error', testController.testControllerErrorMethod);
    app.post('/validate', testController.testControllerValidateMethod);
    app.post('/db', testController.testDatabase);
    app.post('/transform', testController.testTransformData);
};
