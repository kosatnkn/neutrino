module.exports = function (config)
{
    const ErrorCodes = {
        CONNECTION_ERROR: '28P01',
        DATABASE_NOT_FOUND: '3D000',
        CONNECTION_REFUSED: 'ECONNREFUSED'
    };

    var pg = require("pg");
    var dbAdapterError = require('./postgres_error');

    var _config = {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password
    };


    function query(query, parameters, resultCallback)
    {
        var pool = _getPool();

        pool.query(query, parameters, function(err, result)
        {
            if(err)
            {
                return resultCallback(_getError(err), null);
            }

            return resultCallback(false, result);
        });
    }


    function _getClient()
    {
        return new pg.Client({
            user: _config.user,
            host: _config.host,
            database: _config.database,
            password: _config.password,
            port: _config.port
        });
    }


    function _getPool()
    {
        return new pg.Pool({
            user: _config.user,
            host: _config.host,
            database: _config.database,
            password: _config.password,
            port: _config.port

            // // number of milliseconds to wait before timing out when connecting a new client
            // // by default this is 0 which means no timeout
            // connectionTimeoutMillis: 0,
            //
            // // number of milliseconds a client must sit idle in the pool and not be checked out
            // // before it is disconnected from the backend and discarded
            // // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
            // idleTimeoutMillis: 10000,
            //
            // // maximum number of clients the pool should contain
            // // by default this is set to 10.
            // max: 10
        });
    }


    function _getError(err)
    {
        console.log(err);

        switch(err.code)
        {
            case ErrorCodes.CONNECTION_ERROR:
                return dbAdapterError.connectionError();
                break;
            case ErrorCodes.CONNECTION_REFUSED:
                return dbAdapterError.connectionError();
                break;
            case ErrorCodes.DATABASE_NOT_FOUND:
                return dbAdapterError.connectionError();
                break;
            default:
                return dbAdapterError.unknownError();
                break;
        }
    }


    return {
        query: query
    }
};
