const _consoleLogger = require('./_console');
const _fileLogger = require('./_file');

// TODO: config file logging using .env

function debug(message)
{
    _consoleLogger.debug(message);
    // _fileLogger.debug(message);
}

function error(message)
{
    _consoleLogger.error(message);
    // _fileLogger.error(message);
}

function help(message)
{
    _consoleLogger.help(message);
    // _fileLogger.help(message);
}

function info(message)
{
    _consoleLogger.info(message);
    // _fileLogger.info(message);
}

function prompt(message)
{
    _consoleLogger.prompt(message);
    // _fileLogger.prompt(message);
}

function warn(message)
{
    _consoleLogger.warn(message);
    // _fileLogger.warn(message);
}

module.exports = {
    debug: debug,
    error: error,
    help: help,
    info: info,
    prompt: prompt,
    warn: warn
};