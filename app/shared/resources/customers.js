resources.factory('Customers', function ($resource, appConfig) {
    return $resource(appConfig.capiUrl + 'analytics/shops/:shopID/customers/stats/:statsType', {
        shopID: appConfig.shopID
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
});