import { Injectable } from '@angular/core';
import { merge, map } from 'lodash';
import * as moment from 'moment';

import { CurrencyService } from 'koffing/common/currency.service';
import { Registry } from './registry';
import { PaymentRegistryItem } from './payment-registry-item';
import { RefundRegistryItem } from './refund-registry-item';
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
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(
        private excelService: ExcelService
    ) {
    }

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
        return this.createHeader({
                title: 'Успешные платежи за период',
                header: 'Выполнено переводов в пользу клиента за период:',
                client: registry.client
            },
            registry,
            [10, 18, 20, 18, 18, 30, 30, 50],
            [
                '№ п/п',
                'Дата платежа',
                'ID инвойса и платежа',
                'Принято, руб.',
                'К зачислению, руб.',
                'Email плательщика',
                'Наименование товара',
                'Описание предоставленных товаров или услуг',
            ]);
    }

    private createCapturedPaymentsBody(registryItems: PaymentRegistryItem[]): object {
        const offsetRow = this.capturedPaymentsWorksheet.headerSizes.rows;
        const arrayOfArrays = map(registryItems, (item: PaymentRegistryItem, index) => ([
            index + 1,
            moment(item.paymentDate).format('DD.MM.YY HH:mm:ss'),
            item.invoiceID,
            CurrencyService.toMajor(item.amount),
            CurrencyService.toMajor(item.amount - (item.fee || 0)),
            item.userEmail,
            item.product,
            item.description
        ]));
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow, {border: this.cellBorder});
    }

    private createRefundedPaymentsWorksheetFromRegistry(registry: Registry): object {
        let worksheet = {};
        worksheet = merge(worksheet, this.createRefundedPaymentsHeader(registry));
        worksheet = merge(worksheet, this.createRefundedPaymentsBody(registry.refundedPaymentItems));
        return worksheet;
    }

    private createRefundedPaymentsHeader(registry: Registry): object {
        return this.createHeader({
                title: 'Возвраты за период',
                header: 'Выполнено возвратов за период:',
                client: registry.client
            }, registry,
            [10, 18, 20, 18],
            ['№ п/п', 'Дата возврата', 'ID инвойса и платежа', 'Возвращено, руб.']);
    }

    private createHeader(titles: { title: string, header: string, client: string }, interval: { fromTime: Date, toTime: Date }, colWidths: number[], tableHeader: string[]) {
        const tableHeaderLastColNum = tableHeader.length - 1;
        return {
            'A1': {
                v: `${titles.title} с ${this.getStringifyDateInterval(interval.fromTime, interval.toTime)}`,
                s: {alignment: {horizontal: 'center', vertical: 'center'}, font: {bold: true}}
            },
            'A3': {v: 'НКО:', s: {font: {bold: true}}},
            'B3': {v: 'НКО «ЭПС» (ООО)'},
            'A4': {v: 'Клиент:', s: {font: {bold: true}}},
            'B4': {v: titles.client},
            'A6': {
                v: titles.header,
                s: {alignment: {horizontal: 'center', vertical: 'center'}}
            },
            ...this.createTableHeader(tableHeader, 7),
            '!ref': this.excelService.getEncodeRange(this.capturedPaymentsWorksheet.headerSizes.rows, this.capturedPaymentsWorksheet.headerSizes.columns),
            '!cols': colWidths.map(width => ({wch: width})),
            '!merges': [
                {s: {r: 0, c: 0}, e: {r: 0, c: tableHeaderLastColNum}},
                {s: {r: 5, c: 0}, e: {r: 5, c: tableHeaderLastColNum}}
            ]
        };
    }

    private createTableHeader(tableHeader: string[], rowNum: number): object {
        const style = {font: {bold: true}, border: this.cellBorder};
        const tableHeaderObject: object = {};
        tableHeader.forEach((item, idx) => tableHeaderObject[this.alphabet[idx] + rowNum] = {v: item, s: style});
        return tableHeaderObject;
    }

    private createRefundedPaymentsBody(registryItems: RefundRegistryItem[]): object {
        const offsetRow = this.capturedPaymentsWorksheet.headerSizes.rows;
        const arrayOfArrays = map(registryItems, (item: RefundRegistryItem, index) => ([
            index + 1,
            moment(item.refundDate).format('DD.MM.YY HH:mm:ss'),
            item.invoiceID,
            CurrencyService.toMajor(item.amount)
        ]));
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow, {border: this.cellBorder});
    }
}
