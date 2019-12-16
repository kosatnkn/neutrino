"use strict";

module.exports = (dbAdapter) => {
    
    function getUserList(resultCallback) {

        dbAdapter.query('SELECT * FROM test.user', [], (err, result) => {

            if(err) {
                return resultCallback(err, null);
            }

            return resultCallback(null, result.rows);
        });
    }

    return {
        getUserList: getUserList
    }
};