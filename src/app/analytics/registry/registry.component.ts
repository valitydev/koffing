import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { DateRange } from '../date-range-selector/date-range.class';
import { RegistryExportService } from './registry-export.service';
import { RegistryDataService } from './registry-data.service';
import { ExcelService } from './excel/excel.service';

@Component({
    templateUrl: 'registry.component.pug',
    providers: [ RegistryExportService, RegistryDataService, ExcelService ]
})
export class RegistryComponent implements OnInit {

    public shopID: string;
    public fromTime: Date;
    public toTime: Date;

    constructor(
        private route: ActivatedRoute,
        private registryDataService: RegistryDataService,
        private registryExportService: RegistryExportService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => this.shopID = params['shopID']);
        this.fromTime = moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate();
        this.toTime = moment().hour(23).minute(59).second(59).toDate();
    }

    public exportRegistryToXLSX(dateRange: DateRange) {
        this.registryDataService.getRegistry(this.shopID, dateRange.from, dateRange.to).subscribe((registry) => {
            this.registryExportService.exportRegistryToXLSX(registry);
        });
    }
}
