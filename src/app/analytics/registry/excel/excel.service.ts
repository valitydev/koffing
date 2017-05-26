import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { Cell } from './cell';

declare const XLSX: any;

@Injectable()
export class ExcelService {

    public worksheetFromArrayOfArrays(data: any[], offsetRow?: number, cellStyle?: Object): Object {
        offsetRow = offsetRow || 0;
        const ws = {};
        const range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0 }};
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
                const cell = new Cell();
                cell.v = data[R][C];
                if (cell.v === null) {
                    continue;
                }
                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                } else if (typeof cell.v === 'boolean') {
                    cell.t = 'b';
                } else {
                    cell.t = 's';
                }
                if (cellStyle) {
                    cell.s = cellStyle;
                }
                const cellRef = XLSX.utils.encode_cell({r: R + offsetRow, c: C});
                ws[cellRef] = cell;

                if (range.s.r > R) { range.s.r = R; }
                if (range.s.c > C) { range.s.c = C; }
                if (range.e.r < R) { range.e.r = R; }
                if (range.e.c < C) { range.e.c = C; }
            }
        }
        if (range.s.c < 10000000) {
            range.e.r = range.e.r + offsetRow;
            ws['!ref'] = XLSX.utils.encode_range(range.s, range.e);
        }
        return ws;
    }

    public getEncodeRange(countRows: number, countsColumns: number): string {
        const range = {s: {r: 0, c: 0}, e: {r: countRows - 1, c: countsColumns - 1}};
        return XLSX.utils.encode_range(range.s, range.e);
    }

    public saveAsXLSX(workbook: any, fileName: string) {
        function s2ab(s: any) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
        const wbout = XLSX.write(workbook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), `${fileName}.xlsx`);
    }
}
