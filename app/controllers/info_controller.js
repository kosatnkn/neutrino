module.exports = function (app) {
    const responseCodes = require('http-status-codes');

    let container = app.get('container');
    // let validator = app.get('validator');
    let responseMapper = app.get('response_mapper');
    // let asyncErrorHandler = app.get('async_error_handler');

    // let logger = require('../logger');
    // let Context = require('../transport/request/context');

    /**
     * Get API information
     *
     * @param req
     * @param res
     */
    function getInfo(req, res)
    {
        let data = {
            name: "Neutrino",
            version: "v1.0.0",
            purpose: "NodeJS, Express REST API"
        }

        res.status(responseCodes.OK).json(
            responseMapper.map(
                data
            )
        );
    }


    return {
        getInfo: getInfo
    };
};
