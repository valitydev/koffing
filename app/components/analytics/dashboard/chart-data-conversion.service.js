dashboard.service('ChartDataConversion', function () {

    this.toConversionChartData = conversionStat => _.map(conversionStat, item => {
        return {
            conversion: item.conversion,
            offset: item.offset
        }
    });

    this.toPaymentCountInfo = conversionStat => _.reduce(conversionStat, (acc, item) => {
        return {
            successfulCount: acc.successfulCount + item.successfulCount,
            unfinishedCount: acc.unfinishedCount + (item.totalCount - item.successfulCount)
        };
    }, {
        successfulCount: 0,
        unfinishedCount: 0
    });

    this.toRevenueChartData = revenueStat => _.map(revenueStat, item => {
        return {
            profit: item.profit,
            offset: item.offset
        }
    });

    this.toTotalProfit = revenueStat => _.reduce(revenueStat, (acc, item) => acc + item.profit, 0);

    this.toGeoChartData = geoStat => _.map(geoStat, item => {
        return {
            cityName: item.cityName,
            profit: item.profit
        }
    });

    this.toPaymentMethodChartData = paymentMethodStat => _.map(paymentMethodStat, item => {
        return {
            totalCount: item.totalCount,
            paymentSystem: item.paymentSystem
        }
    })
});
