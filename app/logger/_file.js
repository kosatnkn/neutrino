/**
 * File logger will log to a file in storage.
 *
 * NOTE: By default the logger uses npm logging levels. They are prioritized from 0 to 5 (highest to lowest).
 *       When a logging level is defined the logger will only log errors which have equal or higher precedence than
 *       that logging level.
 *
 *      error   = 0
 *      warn    = 1
 *      info    = 2
 *      verbose = 3
 *      debug   = 4
 *      silly   = 5
 */
const winston = require('winston');
const moment = require('moment');

const fileName = './logs/' + moment(moment()).format('YYYY-MM-DD') + '-log.log';
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()),
    transports: [
        new winston.transports.File({ filename: fileName })
    ]
});

function error(message)
{
    logger.error(message);
}

function warn(message)
{
    logger.warn(message);
}

function info(message)
{
    logger.info(message);
}

function help(message)
{
    logger.verbose(message);
}

function debug(message)
{
    logger.debug(message);
}

function prompt(message)
{
    logger.verbose(message);
}

module.exports = {
    debug: debug,
    error: error,
    help: help,
    info: info,
    prompt: prompt,
    warn: warn
};