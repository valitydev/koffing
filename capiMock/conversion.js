function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createConversion(count) {
    var result = [];
    for (var i = 0; i <= count; i++) {
        result.push({
            offset: (i * 2) * 86400,
            successful_count: random(190, 200),
            total_count: random(200, 210),
            conversion: random(10, 90)
        });
    }
    return result;
}

module.exports = createConversion(15);
