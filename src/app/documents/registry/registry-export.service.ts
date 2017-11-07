import { Injectable } from '@angular/core';
import { merge, map } from 'lodash';
import * as moment from 'moment';

import { CurrencyService } from 'koffing/common/currency.service';
import { Registry } from './registry';
import { RegistryItem } from './registry-item';
import { Workbook } from './excel/workbook';
import { ExcelService } from './excel/excel.service';
import { WorksheetProperties } from './worksheet-properties';

@Injectable()
export class RegistryExportService {

    private capturedPaymentsWorksheet: WorksheetProperties = {
        name: 'Успешные платежи',
        headerSizes: {rows: 7, columns: 7}
    };
    private refundedPaymentsWorksheet: WorksheetProperties = {
        name: 'Возвраты',
        headerSizes: {rows: 7, columns: 6}
    };
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
        const fileName = `Реестр операций ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`;
        this.excelService.saveAsXLSX(workbook, fileName);
    }

    private getStringifyDateInterval(fromTime: Date, toTime: Date): string {
        return `с ${moment(fromTime).format('DD.MM.YY')} по ${moment(toTime).format('DD.MM.YY')}`;
    }

    private createWorkbookFromRegistry(registry: Registry): Workbook {
        const workbook = new Workbook();
        workbook.SheetNames.push(this.capturedPaymentsWorksheet.name);
        workbook.SheetNames.push(this.refundedPaymentsWorksheet.name);
        workbook.Sheets[this.capturedPaymentsWorksheet.name] = this.createCapturedPaymentsWorksheetFromRegistry(registry);
        workbook.Sheets[this.refundedPaymentsWorksheet.name] = this.createRefundedPaymentsWorksheetFromRegistry(registry);
        return workbook;
    }

    private createCapturedPaymentsWorksheetFromRegistry(registry: Registry): object {
        let worksheet = {};
        worksheet = merge(worksheet, this.createCapturedPaymentsHeader(registry));
        worksheet = merge(worksheet, this.createCapturedPaymentsBody(registry.capturedPaymentItems));
        return worksheet;
    }

    private createCapturedPaymentsHeader(registry: Registry): object {
        const header = {};
        header['A1'] = {
            v: `Успешные платежи за период ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`,
            s: {alignment: {horizontal: 'center', vertical: 'center'}, font: {bold: true}}
        };
        header['A3'] = {v: 'НКО:', s: {font: {bold: true}}};
        header['B3'] = {v: 'НКО «ЭПС» (ООО)'};
        header['A4'] = {v: 'Клиент:', s: {font: {bold: true}}};
        header['B4'] = {v: registry.client};
        header['A6'] = {v: 'Выполнено переводов в пользу клиента за период:', s: {alignment: {horizontal: 'center', vertical: 'center'}}};
        header['A7'] = {v: '№ п/п', s: {font: {bold: true}, border: this.cellBorder}};
        header['B7'] = {v: 'Дата платежа', s: {font: {bold: true}, border: this.cellBorder}};
        header['C7'] = {v: 'ID инвойса и платежа', s: {font: {bold: true}, border: this.cellBorder}};
        header['D7'] = {v: 'Принято, руб.', s: {font: {bold: true}, border: this.cellBorder}};
        header['E7'] = {v: 'К зачислению, руб.', s: {font: {bold: true}, border: this.cellBorder}};
        header['F7'] = {v: 'Email плательщика', s: {font: {bold: true}, border: this.cellBorder}};
        header['G7'] = {v: 'Наименование товара', s: {font: {bold: true}, border: this.cellBorder}};
        header['H7'] = {v: 'Описание предоставленных товаров или услуг', s: {font: {bold: true}, border: this.cellBorder}};
        header['!ref'] = this.excelService.getEncodeRange(this.capturedPaymentsWorksheet.headerSizes.rows, this.capturedPaymentsWorksheet.headerSizes.columns);
        header['!cols'] = [{wch: 10}, {wch: 18}, {wch: 20}, {wch: 18}, {wch: 18}, {wch: 30}, {wch: 30}, {wch: 50}];
        header['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 7}},
            {s: {r: 5, c: 0}, e: {r: 5, c: 7}}
        ];
        return header;
    }

    private createCapturedPaymentsBody(registryItems: RegistryItem[]): object {
        const offsetRow = this.capturedPaymentsWorksheet.headerSizes.rows;
        const arrayOfArrays = map(registryItems, (item: RegistryItem, index) => {
            const row = [];
            row.push(index + 1);
            row.push(moment(item.paymentDate).format('DD.MM.YY HH:mm:ss'));
            row.push(item.invoiceID);
            row.push(CurrencyService.toMajor(item.amount));
            row.push(CurrencyService.toMajor(item.amount - (item.fee || 0)));
            row.push(item.userEmail);
            row.push(item.product);
            row.push(item.description);
            return row;
        });
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow, {border: this.cellBorder});
    }

    private createRefundedPaymentsWorksheetFromRegistry(registry: Registry): object {
        let worksheet = {};
        worksheet = merge(worksheet, this.createRefundedPaymentsHeader(registry));
        worksheet = merge(worksheet, this.createRefundedPaymentsBody(registry.refundedPaymentItems));
        return worksheet;
    }

    private createRefundedPaymentsHeader(registry: Registry): object {
        const header = {};
        header['A1'] = {
            v: `Возвраты за период ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`,
            s: {alignment: {horizontal: 'center', vertical: 'center'}, font: {bold: true}}
        };
        header['A3'] = {v: 'НКО:', s: {font: {bold: true}}};
        header['B3'] = {v: 'НКО «ЭПС» (ООО)'};
        header['A4'] = {v: 'Клиент:', s: {font: {bold: true}}};
        header['B4'] = {v: registry.client};
        header['A6'] = {v: 'Выполнено возвратов за период:', s: {alignment: {horizontal: 'center', vertical: 'center'}}};
        header['A7'] = {v: '№ п/п', s: {font: {bold: true}, border: this.cellBorder}};
        header['B7'] = {v: 'Дата платежа', s: {font: {bold: true}, border: this.cellBorder}};
        header['C7'] = {v: 'ID инвойса и платежа', s: {font: {bold: true}, border: this.cellBorder}};
        header['D7'] = {v: 'Возвращено, руб.', s: {font: {bold: true}, border: this.cellBorder}};
        header['E7'] = {v: 'Email плательщика', s: {font: {bold: true}, border: this.cellBorder}};
        header['F7'] = {v: 'Наименование товара', s: {font: {bold: true}, border: this.cellBorder}};
        header['G7'] = {v: 'Описание предоставленных товаров или услуг', s: {font: {bold: true}, border: this.cellBorder}};
        header['!ref'] = this.excelService.getEncodeRange(this.capturedPaymentsWorksheet.headerSizes.rows, this.capturedPaymentsWorksheet.headerSizes.columns);
        header['!cols'] = [{wch: 10}, {wch: 18}, {wch: 20}, {wch: 18}, {wch: 30}, {wch: 30}, {wch: 50}];
        header['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 6}},
            {s: {r: 5, c: 0}, e: {r: 5, c: 6}}
        ];
        return header;
    }

    private createRefundedPaymentsBody(registryItems: RegistryItem[]): object {
        const offsetRow = this.capturedPaymentsWorksheet.headerSizes.rows;
        const arrayOfArrays = map(registryItems, (item: RegistryItem, index) => {
            const row = [];
            row.push(index + 1);
            row.push(moment(item.paymentDate).format('DD.MM.YY HH:mm:ss'));
            row.push(item.invoiceID);
            row.push(CurrencyService.toMajor(item.amount));
            row.push(item.userEmail);
            row.push(item.product);
            row.push(item.description);
            return row;
        });
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow, {border: this.cellBorder});
    }
}
