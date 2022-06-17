/**
 * @name micro-images-hydra-v1-api
 * @description This module packages the Micro-images-hydra API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

const bodyParser = require('body-parser');
const { downloadCustomImage } = require('../controllers/get-controller');
const { queryUpload } = require('../controllers/head-controller');
const { upload } = require('../controllers/post-controller');
const { validateImage } = require('../controllers/param-controller');



let serverResponse = new ServerResponse();
express.response.sendError = function (err) {
    serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
    serverResponse.sendOk(this, { result });
};


let api = express.Router();


api.get('/', (req, res) => {
    res.sendOk({ greeting: 'Welcome to Hydra Express!' });
});


api.param('image', validateImage)

api.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)
api.head('/uploads/:image', queryUpload)
api.get('/uploads/:image', downloadCustomImage)


module.exports = api;
