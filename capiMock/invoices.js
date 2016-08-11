var random = require('./utils/random');

function createInvoices(count) {
    var result = [];
    for (var i = 1; i <= count; i++) {
        result.push({
            id: i,
            shopID: 1,
            amount: random(100000, 2500000),
            currency: 'RUB',
            dueDate: '2016-07-01T00:00:00+03:00',
            status: 'paid',
            product: 'test product',
            description: 'test description'
        })
    }
    return result;
}

module.exports = {
    length: 1456,
    invoices: createInvoices(20)
};