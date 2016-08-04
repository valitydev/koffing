function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRevenues(count) {
    var result = [];
    for (var i = 0; i <= count; i++) {
        var profit = random(1000, 20000) * 100;
        result.push({
            offset: i * 86400,
            currency: 'RUB',
            profit: profit,
            revenue: profit * 0.3
        });
    }
    return result;
}

module.exports = createRevenues(31);
