dashboard.component('dashboard', {
    templateUrl: 'components/analytics/dashboard/dashboard.template.html',
    controller: function (Payments, ChartDataConversion, Customers, Accounts) {
        this.fromTime = moment(this.toTime).subtract(1, 'M').hours(0).minutes(0).seconds(0).milliseconds(0).format();
        this.toTime = moment().format();

        this.loadData = () => {
            this.chartFromTime = this.fromTime;

            const customers = new Customers(this.shopID);
            customers.rate({
                fromTime: this.fromTime,
                toTime: this.toTime
            }, rateStat => {
                this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
            });

            customers.paymentMethod({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1,
                paymentMethod: 'bank_card'
            }, paymentMethodStat => {
                this.paymentMethodChartData = ChartDataConversion.toPaymentMethodChartData(paymentMethodStat);
            });

            const payments = new Payments(this.shopID);
            payments.conversion({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1
            }, conversionStat => {
                this.conversionChartData = ChartDataConversion.toConversionChartData(conversionStat);
                const paymentCountInfo = ChartDataConversion.toPaymentCountInfo(conversionStat);
                this.successfulCount = paymentCountInfo.successfulCount;
                this.unfinishedCount = paymentCountInfo.unfinishedCount;
            });

            payments.revenue({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1
            }, revenueStat => {
                this.revenueChartData = ChartDataConversion.toRevenueChartData(revenueStat);
                this.profit = ChartDataConversion.toTotalProfit(revenueStat);
            });

            payments.geo({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'day',
                splitSize: 1
            }, geoStat => {
                this.geoChartData = ChartDataConversion.toGeoChartData(geoStat);
            });

            Accounts.query({shopID: this.shopID}, shopAccounts => {
                if (shopAccounts.length > 1) {
                    console.warn('shop accounts size > 1');
                }
                _.forEach(shopAccounts, item => {
                    const account = {};
                    Accounts.get({
                        shopID: this.shopID,
                        accountID: item.generalID
                    }, generalAccount => {
                        account.general = generalAccount;
                    });

                    Accounts.get({
                        shopID: this.shopID,
                        accountID: item.guaranteeID
                    }, guaranteeAccount => {
                        account.guarantee = guaranteeAccount;
                    });
                    this.account = account;
                });
            });
        };

        this.$routerOnActivate = route => {
            this.shopID = route.params.shopId;
            this.loadData();
        };
    }
});
