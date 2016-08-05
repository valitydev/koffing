var dashboard = angular.module('dashboard', ['infoPanel', 'revenue', 'conversion', 'geolocation']);

dashboard.component('dashboard', {
    templateUrl: 'components/dashboard/dashboard.html',
    controller: function (appConfig, Stats) {
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
            this.conversionChartData = _.map(conversionStat, item => {
                return {
                    conversion: item.conversion,
                    offset: item.offset
                }
            });

            const paymentCountInfo = _.reduce(conversionStat, (acc, item) => {
                return {
                    successfulCount: acc.successfulCount + item.successfulCount,
                    unfinishedCount: acc.unfinishedCount + (item.totalCount - item.successfulCount)
                };
            }, {
                successfulCount: 0,
                unfinishedCount: 0
            });
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
        });

        Stats.revenue({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 1
        }, revenueStat => {
            this.revenueChartData = _.map(revenueStat, item => {
                return {
                    profit: item.profit,
                    offset: item.offset
                }
            });

            this.profit = _.reduce(revenueStat, (acc, item) => acc + item.profit / 100, 0);
        });

        Stats.geo({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 1
        }, geoStat => {
            this.geoChartData = _.map(geoStat, item => {
                return {
                    cityName: item.cityName,
                    profit: item.profit
                }
            });
        });

        Stats.rate({
            fromTime: this.fromTime,
            toTime: this.toTime
        }, rateStat => {
            this.uniqueCount = rateStat.uniqueCount;
        });
    }
});
