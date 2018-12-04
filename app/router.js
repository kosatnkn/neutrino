module.exports = function (app)
{
    // constructor ___
    var testController = require('./controllers/test_controller')(app);

    app.get('/', testController.testControllerMethod);
    app.get('/error', testController.testControllerErrorMethod);
    app.post('/validate', testController.testControllerValidateMethod);
    app.post('/db', testController.testDatabase);
    app.post('/transform', testController.testTransformData);
};
