export class Workbook {
    public SheetNames: string[];
    public Sheets: Object;

    constructor() {
        this.SheetNames = [];
        this.Sheets = {};
    }
}
