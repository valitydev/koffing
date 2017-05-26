import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Registry } from './registry';
import { RegistryItem } from './registry-item';
import { Workbook } from './excel/workbook';
import { ExcelService } from './excel/excel.service';

@Injectable()
export class RegistryExportService {

    private worksheetName: string = 'Реестр';
    private worksheetHeaderSizes = {rows: 7, columns: 7};
    private cellBorder = {
        left: {style: 'thin', color: {auto: 1}},
        right: {style: 'thin', color: {auto: 1}},
        top: {style: 'thin', color: {auto: 1}},
        bottom: {style: 'thin', color: {auto: 1}}
    };

    constructor(
        private excelService: ExcelService
    ) { }

    public exportRegistryToXLSX(registry: Registry) {
        const workbook = this.createWorkbookFromRegistry(registry);
        const fileName = `${this.worksheetName} ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`;
        this.excelService.saveAsXLSX(workbook, fileName);
    }

    private createWorkbookFromRegistry(registry: Registry): Workbook {
        const workbook = new Workbook();
        const worksheet = this.createWorksheetFromRegistry(registry);
        workbook.SheetNames.push(this.worksheetName);
        workbook.Sheets[this.worksheetName] = worksheet;
        return workbook;
    }

    private createWorksheetFromRegistry(registry: Registry): Object {
        let worksheet = {};
        worksheet = _.merge(worksheet, this.createRegistryHeader(registry));
        worksheet = _.merge(worksheet, this.createRegistryBody(registry.items));
        return worksheet;
    }

    private getStringifyDateInterval(fromTime: Date, toTime: Date): string {
        return `с ${moment(fromTime).format('DD.MM.YY')} по ${moment(toTime).format('DD.MM.YY')}`;
    }

    private createRegistryHeader(registry: Registry): Object {
        const header = {};
        header['A1'] = {
            v: `Реестр операций за период ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`,
            s: {alignment: {horizontal: 'center', vertical: 'center'}, font: {bold: true}}
        };
        header['A3'] = {v: 'НКО:', s: {font: {bold: true}}};
        header['B3'] = {v: 'НКО «ЭПС» (ООО)'};
        header['A4'] = {v: 'Клиент:', s: {font: {bold: true}}};
        header['B4'] = {v: registry.client};
        header['A6'] = {v: 'Выполнено переводов в пользу клиента за период:', s: {alignment: {horizontal: 'center', vertical: 'center'}}};
        header['A7'] = {v: '№ п/п', s: {font: {bold: true}, border: this.cellBorder}};
        header['B7'] = {v: 'Дата', s: {font: {bold: true}, border: this.cellBorder}};
        header['C7'] = {v: 'ID инвойса и платежа', s: {font: {bold: true}, border: this.cellBorder}};
        header['D7'] = {v: 'Принято, руб.', s: {font: {bold: true}, border: this.cellBorder}};
        header['E7'] = {v: 'К зачислению, руб.', s: {font: {bold: true}, border: this.cellBorder}};
        header['F7'] = {v: 'Наименование товара', s: {font: {bold: true}, border: this.cellBorder}};
        header['G7'] = {v: 'Описание предоставленных товаров или услуг', s: {font: {bold: true}, border: this.cellBorder}};
        header['!ref'] = this.excelService.getEncodeRange(this.worksheetHeaderSizes.rows, this.worksheetHeaderSizes.columns);
        header['!cols'] = [{wch: 10}, {wch: 18}, {wch: 20}, {wch: 18}, {wch: 18}, {wch: 30}, {wch: 50}];
        header['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 6}},
            {s: {r: 5, c: 0}, e: {r: 5, c: 6}}
        ];
        return header;
    }

    private createRegistryBody(registryItems: RegistryItem[]): Object {
        const offsetRow = this.worksheetHeaderSizes.rows;
        const arrayOfArrays = this.arrayOfArraysFromRegistry(registryItems);
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow, {border: this.cellBorder});
    }

    private arrayOfArraysFromRegistry(registryItems: RegistryItem[]): any[][] {
        return _.map(registryItems, (item: RegistryItem, index) => {
            const row = [];
            row.push(index + 1);
            row.push(moment(item.paymentDate).format('DD.MM.YY HH:mm:ss'));
            row.push(item.invoiceID);
            row.push(item.amount / 100);
            row.push((item.amount - (item.fee || 0)) / 100);
            row.push(item.product);
            row.push(item.description);
            return row;
        });
    }
}
