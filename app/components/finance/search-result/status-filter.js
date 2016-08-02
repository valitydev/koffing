searchResult.filter('paymentStatus', function (PAYMENT_STATUSES) {
    return function(input) {
        const result = PAYMENT_STATUSES[input];
        return result ? result : input;
    };
});
