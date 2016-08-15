const currency = angular.module('currency', []);

/**
 * @param {int} val: format value
 * @param {int} decimalLength: length of decimal
 * @param {int} wholeLength: length of whole part
 * @param {mixed}   delimiter: sections delimiter
 * @param {mixed }  decimalDelimiter: decimal delimiter
 */
function format(val, decimalLength, wholeLength, delimiter, decimalDelimiter) {
    var exp = '\\d(?=(\\d{' + (wholeLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    var num = val.toFixed(Math.max(0, ~~decimalLength));
    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(exp, 'g'), '$&' + (delimiter || ','));
}

currency.filter('roubleCurrency', function () {
    return function (input) {
        const val = _.chain(input).toNumber().divide(100).round(2).value();
        return val ? format(val, 0, 3, ' ', '.') : input;
    };
});
