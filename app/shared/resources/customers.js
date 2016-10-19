resources.factory('Customers', function ($resource, appConfig) {
    return function (shopID) {
        return $resource(`${appConfig.capiUrl}/analytics/shops/:shopID/customers/stats/:statsType`, {
            shopID: shopID
        }, {
            /**
             * @typedef {Object} Parameters
             * @property {dateTime} fromTime
             * @property {dateTime} toTime
             */

            /**
             * @returns {PaymentRateStat}
             */
            rate: {method: 'GET', isArray: true, params: {statsType: 'rate'}},

            /**
             * @typedef {Object} Parameters
             * @property {dateTime} fromTime
             * @property {dateTime} toTime
             * @property {string} splitUnit
             * @property {int} splitSize
             * @property {string} paymentMethod
             */
            /**
             * @returns {Array.<PaymentMethodStat>}
             */
            paymentMethod: {method: 'GET', isArray: true, params: {statsType: 'payment_method'}}
        });
    }
});