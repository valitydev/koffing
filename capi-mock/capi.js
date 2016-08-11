'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const invoices = require('./invoices');
const revenue = require('./revenue');
const conversion = require('./conversion');
const geo = require('./geo');
const rate = require('./rate');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

router.route('/invoices').get((req, res) => setTimeout(() => res.json(invoices), 300));

router.route('/payments/stats/revenue').get((req, res) => setTimeout(() => res.json(revenue), 0));

router.route('/payments/stats/conversion').get((req, res) => setTimeout(() => res.json(conversion), 0));

router.route('/payments/stats/geo').get((req, res) => setTimeout(() => res.json(geo), 0));

router.route('/payments/stats/rate').get((req, res) => setTimeout(() => res.json(rate), 0));

app.use('/v1/analytics/shops/1', router);

app.listen(9000);
