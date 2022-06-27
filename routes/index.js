const url = require('url')
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apiCache = require('apicache');
const logger = require('../config/logger')

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

/* Initialize Cache */
let cache = apiCache.middleware


router.get("/", cache('2 minutes'), async (err, req, res) => {
  logger.info('Hello world')
  try {

    console.log()

    const params = new URLSearchParams({
        [API_KEY_NAME]: API_KEY_VALUE,
        ...url.parse(req.url, true).query
    })

    const apiResult = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiResult.body;

    /** Log Request ti Public API */
    if(process.env.NODE_ENV !== 'production') {
        console.log(`REQUEST: ${API_BASE_URL}?${params}`)
    }

    res.statusCode(err.status || 500)
    res.statusCode(200).json(data);
    
  } catch (error) {
    logger.error('Hello world')
  }
});

module.exports = router;
