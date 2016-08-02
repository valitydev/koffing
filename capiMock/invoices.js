function createInvoices(count) {
    var result = [];
    for (var i = 1; i <= count; i++) {
        result.push({
            id: i,
            shopID: 1,
            amount: 2100000,
            currency: 'RUB',
            dueDate: '2016-07-01T00:00:00+03:00',
            status: 'paid',
            product: 'test product',
            description: 'test description'
        })
    }
    return result;
}

module.exports = createInvoices(255);