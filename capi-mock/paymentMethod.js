var random = require('./utils/random');

function getPaymentCity(id) {
    var cities = ['visa', 'master_card'];
    return cities[id];
}

function createPayment(count) {
    var result = [];
    for (var i = 0; i <= count; i++) {
        var profit = random(1000, 7000) * 100;
        result.push({
            statType: 'bank_card',
            offset: i * 86400,
            profit: profit,
            revenue: profit * 0.3,
            totalCount: random(0, 10),
            paymentSystem: (getPaymentCity(random(0, 1)))
        });
    }
    return result;
}

module.exports = createPayment(300);
