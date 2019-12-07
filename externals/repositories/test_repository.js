"use strict";

module.exports = function(dbAdapter)
{
    function getUserList(resultCallback)
    {
        dbAdapter.query('SELECT * FROM test.user', [], function(err, result)
        {
            if(err)
            {
                return resultCallback(err, null);
            }

            return resultCallback(false, result.rows);
        });
    }


    return {
        getUserList: getUserList
    }
};