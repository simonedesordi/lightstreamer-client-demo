require("babel-core/register");
require("babel-polyfill");

// app arguments
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

// logger
import winston from 'winston';
const logger = winston;
logger.info('set log level to ' + args.logLevel);
logger.level = args.logLevel || 'info'; // set log level
logger.info('setted log level to ' + logger.level);

import express from 'express';
const app = express();

var port = function () {
    var portGlobal = process.env.PORT;
    logger.info("portGlobal = " + portGlobal);

    var port = portGlobal /*|| portParameter*/ || '9090';
    logger.info("port = " + port);

    return port;
};

// serve static files from current directory
app.use(express.static(__dirname + '/static/'));

var server = app.listen(port());