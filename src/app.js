const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const featuresRouter = require('./features');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(featuresRouter);

module.exports = app;
