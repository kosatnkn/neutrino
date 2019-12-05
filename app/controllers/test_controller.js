module.exports = function(app)
{
    const responseCodes = require('http-status-codes');

    var container = app.get('container');
    var validator = app.get('validator');
    var responseMapper = app.get('response_mapper');
    var asyncErrorHandler = app.get('async_error_handler');

    // entities ___
    var Test = require('./../../domain/entities/test_entity');

    // transformers ___
    var testTransformer = require('./../transformers/test_transformer');

    // constructor ___
    var testUseCase = require('./../../domain/usecases/test_usecase/test_usecase')(
        container.repositories.test
    );


    /**
     * Demonstrate the usage of an entity to map all data to be sent to a use case.
     *
     * @param req
     * @param res
     */
    function testControllerMethod(req, res)
	{
	    test = new Test;
	    test.firstName = "First";
	    test.lastName = "Last";

	    res.send(testUseCase.testMethodThree(test));
	}


    /**
     * Demonstrate the usage of synchronous error handling.
     *
     * @param req
     * @param res
     */
	function testControllerErrorMethod(req, res)
	{
        testUseCase.testMethodError();
	}


    /**
     * Demonstrate the usage of a request validator.
     *
     * @param req
     * @param res
     */
    function testControllerValidateMethod(req, res)
    {
        const rules = {
            user: {
                presence: true
            },
            password: {
                presence: true
            }
        };

        var data = req.body;
        var valid = validator.validate(data, rules);

        res.send(valid);
    }


    /**
     * Demonstrate communicating with a database asynchronously.
     *
     * @param req
     * @param res
     */
    function testDatabase(req, res)
    {
        testUseCase.testMethodDatabase(function (err, result)
        {
            if(err)
            {
                asyncErrorHandler.handle(err, res);
                return;
            }

            res.json(result);
        });
    }


    /**
     * Demonstrate data transformation.
     *
     * @param req
     * @param res
     */
    function testTransformData(req, res)
    {
        testUseCase.testMethodDatabase(function (err, result)
        {
            if(err)
            {
                asyncErrorHandler.handle(err, res);
                return;
            }

            res.status(responseCodes.OK).json(
                responseMapper.map(
                    responseMapper.transform(result, testTransformer, true)
                )
            );
        });
    }


	return {
	    testControllerMethod: testControllerMethod,
	    testControllerErrorMethod: testControllerErrorMethod,
        testControllerValidateMethod: testControllerValidateMethod,
        testDatabase: testDatabase,
        testTransformData: testTransformData
	};
};
