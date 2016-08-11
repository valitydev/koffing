dashboard.component('dashboard', {
    templateUrl: 'components/dashboard/dashboard.html',
    controller: function (appConfig, Stats, ChartDataConversion) {
        this.toTime = moment().format(appConfig.capiDatetimeFormat);

        this.fromTime = moment(this.toTime)
            .subtract(1, 'M')
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .format(appConfig.capiDatetimeFormat);

        Stats.conversion({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 2
        }, conversionStat => {
            this.conversionChartData = ChartDataConversion.toConversionChartData(conversionStat);
            const paymentCountInfo = ChartDataConversion.toPaymentCountInfo(conversionStat);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
        });

        Stats.revenue({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 1
        }, revenueStat => {
            this.revenueChartData = ChartDataConversion.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversion.toTotalProfit(revenueStat);
        });

        Stats.geo({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 1
        }, geoStat => {
            this.geoChartData = ChartDataConversion.toGeoChartData(geoStat);
        });

        Stats.rate({
            fromTime: this.fromTime,
            toTime: this.toTime
        }, rateStat => {
            this.uniqueCount = rateStat.uniqueCount;
        });
    }
});
