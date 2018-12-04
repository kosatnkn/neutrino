module.exports = function(dbAdapter)
{
    var _dbAdapter = dbAdapter;

    function getUserList(resultCallback)
    {
        _dbAdapter.query('SELECT * FROM test.user', [], function(err, result)
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