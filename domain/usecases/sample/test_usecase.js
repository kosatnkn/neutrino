"use strict";

module.exports = (testRepository) => {
    
    const testUseCaseErrors = require('./_error');

    /**
     * Private method.
     *
     * @param name
     * @returns {string}
     * @private
     */
    function _testMethod(name) {
        return "Hello " + name;
    }

    /**
     * Public method without any parameters.
     *
     * @returns {string}
     */
    function testMethodOne() {
        return _testMethod("");
    }

    /**
     * Public method with parameters.
     *
     * @param name
     * @param name2
     * @returns {string}
     */
    function testMethodTwo(name, name2) {
        return _testMethod(name + " " + name2);
    }

    /**
     * Public method with entity as a parameter.
     *
     * @param test
     * @returns {string}
     */
    function testMethodThree(test) {
        return _testMethod(test.firstName + " " + test.lastName);
    }

    /**
     * Public method that throws a custom error.
     */
    function testMethodError() {
        throw testUseCaseErrors.testError();
    }

    /**
     * Public method that will deal with the database
     */
    function testMethodDatabase(resultCallback) {

        testRepository.getUserList((err, result) => {
            
            if(err) {
                return resultCallback(err, null);
            }

            return resultCallback(false, result);
        });
    }

    return {
        testMethodOne: testMethodOne,
        testMethodTwo: testMethodTwo,
        testMethodThree: testMethodThree,
        testMethodError: testMethodError,
        testMethodDatabase: testMethodDatabase
    };
};
