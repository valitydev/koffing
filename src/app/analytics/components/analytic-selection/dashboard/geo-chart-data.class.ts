export class GeoChartData {
    public geoIDs: string[];
    public data: number[];

    constructor(geoIDs: string[], data: number[]) {
        this.geoIDs = geoIDs;
        this.data = data;
    }
}
