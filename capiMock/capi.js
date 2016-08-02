'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const invoices = require('./invoices');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

router.route('/invoices').get((req, res) => setTimeout(() => res.json(invoices), 300));

app.use('/v1/analytics/shops/1', router);

app.listen(9000);
