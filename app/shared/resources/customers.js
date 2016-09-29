resources.factory('Customers', function ($resource, appConfig) {
    return function (shopID) {
        return $resource(appConfig.capiUrl + 'analytics/shops/:shopID/customers/stats/:statsType', {
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
            rate: {method: 'GET', isArray: true, params: {statsType: 'rate'}}
        });
    }
});