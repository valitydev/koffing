var random = require('./utils/random');

function getCity(id) {
    var cities = ['Москва', 'Санкт-Петербург', 'Самара', 'Краснодар', 'Пенза'];
    return cities[id];
}

function createGeo(count) {
    var result = [];
    for (var i = 0; i <= count; i++) {
        var profit = random(1000, 7000) * 100;
        result.push({
            offset: i * 86400,
            cityName: getCity(random(0, 4)),
            currency: 'RUB',
            profit: profit,
            revenue: profit * 0.3
        });
    }
    return result;
}

module.exports = createGeo(900);
