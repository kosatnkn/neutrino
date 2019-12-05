/**
 * Console logger will log to the console.
 */
const colors = require('colors');

colors.setTheme({
    debug: 'blue',
    error: 'red',
    help: 'cyan',
    info: 'green',
    prompt: 'white',
    warn: 'yellow'
});

function debug(message)
{
    console.log(message.debug);
}

function error(message)
{
    console.log(message.error);
}

function help(message)
{
    console.log(message.help);
}

function info(message)
{
    console.log(message.info);
}

function prompt(message)
{
    console.log(message.prompt);
}

function warn(message)
{
    console.log(message.warn);
}

module.exports = {
    debug: debug,
    error: error,
    help: help,
    info: info,
    prompt: prompt,
    warn: warn
};