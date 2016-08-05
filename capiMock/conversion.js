function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createConversion(count) {
    var result = [];
    for (var i = 0; i <= count; i++) {
        result.push({
            offset: (i * 2) * 86400,
            successfulCount: random(190, 200),
            totalCount: random(200, 210),
            conversion: Math.random() * (0.95 - 0.1) + 0.1
        });
    }
    return result;
}

module.exports = createConversion(15);
