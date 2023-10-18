const cors_origin_urls = require("./config.json").cors_origin_urls;
const mongodb_config = require("./config.json").mongodb_config;

const express = require("express");
const app = express().use(express.json({limit: '5mb'}));

const compression = require('compression')
app.use(compression)

const cors = require("cors");
app.use(cors({origin: cors_origin_urls}));

const mongoose = require("mongoose");
const mongo_url = `${mongodb_config.hostname}:${mongodb_config.port}/${mongodb_config.database}`;
mongoose.set('strictQuery', false)
mongoose.connect(mongo_url);

module.exports = { app, mongoose };
