"use strict";

const responseCodes = require('http-status-codes');
    
module.exports = (app) => {
    
    const responseMapper = app.get('response_mapper');
    
    /**
     * Get API information
     *
     * @param req
     * @param res
     */
    function getInfo(req, res) {

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
