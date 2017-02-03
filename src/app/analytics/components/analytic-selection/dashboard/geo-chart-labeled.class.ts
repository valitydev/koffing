export class GeoChartLabeled {
    public cityNames: string[];
    public data: number[];

    constructor(cityNames: string[], data: number[]) {
        this.cityNames = cityNames;
        this.data = data;
    }
}
