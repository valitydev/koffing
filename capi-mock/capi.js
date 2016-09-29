'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const invoices = require('./invoices');
const revenue = require('./revenue');
const conversion = require('./conversion');
const geo = require('./geo');
const rate = require('./rate');
const me = require('./me');
const claims = require('./claims');
const categories = require('./categories');
const shopAccounts = require('./shopAccounts');
const accounts = require('./accounts');
const paymentMethod = require('./paymentMethod');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Request-ID');
    next();
});

router.route('/processing/me').get((req, res) => setTimeout(() => res.json(me), 0));

router.route('/processing/shops').post((req, res) => setTimeout(() => res.json("1"), 0));

router.route('/processing/shops/THRIFT-SHOP').post((req, res) => setTimeout(() => res.json("2"), 0));

router.route('/processing/shops/THRIFT-SHOP2/activate').put((req, res) => setTimeout(() => res.json("1"), 0));

router.route('/processing/shops/THRIFT-SHOP/accounts').get((req, res) => setTimeout(() => res.json(shopAccounts), 0));

router.route('/processing/shops/THRIFT-SHOP/accounts/1').get((req, res) => setTimeout(() => res.json(accounts[0]), 0));

router.route('/processing/shops/THRIFT-SHOP/accounts/2').get((req, res) => setTimeout(() => res.json(accounts[1]), 0));

router.route('/analytics/shops/THRIFT-SHOP/invoices').get((req, res) => setTimeout(() => res.json(invoices), 0));

router.route('/analytics/shops/THRIFT-SHOP/payments/stats/revenue').get((req, res) => setTimeout(() => res.json(revenue), 0));

router.route('/analytics/shops/THRIFT-SHOP/payments/stats/conversion').get((req, res) => setTimeout(() => res.json(conversion), 0));

router.route('/analytics/shops/THRIFT-SHOP/payments/stats/geo').get((req, res) => setTimeout(() => res.json(geo), 0));

router.route('/analytics/shops/THRIFT-SHOP/customers/stats/rate').get((req, res) => setTimeout(() => res.json(rate), 0));

router.route('/analytics/shops/THRIFT-SHOP/customers/stats/payment_method').get((req, res) => setTimeout(() => res.json(paymentMethod), 0));

router.route('/processing/claims').get((req, res) => setTimeout(() => res.json(claims), 0));

// router.route('/processing/claims').get((req, res) => res.status(404).send('Not found'));

router.route('/processing/claims/1/revoke').post((req, res) => setTimeout(() => res.json(), 0));

router.route('/processing/categories').get((req, res) => setTimeout(() => res.json(categories), 0));

router.route('/processing/categories/1').get((req, res) => setTimeout(() => res.json(categories[0]), 0));

router.route('/processing/categories/1').get((req, res) => setTimeout(() => res.json(categories[0]), 0));

app.use('/v1', router);

app.listen(9000);
