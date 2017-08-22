export class Workbook {
    public SheetNames: string[];
    public Sheets: object;

    constructor() {
        this.SheetNames = [];
        this.Sheets = {};
    }
}
