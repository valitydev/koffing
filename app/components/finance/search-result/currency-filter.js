searchResult.filter('currency', function () {
    return function(input) {
        const result = _.chain(input).toNumber().divide(100).value();
        return result ? result : input;
    };
});
