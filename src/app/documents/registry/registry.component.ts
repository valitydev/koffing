import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DateRange } from 'koffing/common/date-range/date-range';
import { RegistryExportService } from './registry-export.service';
import { RegistryDataService } from './registry-data.service';
import { ExcelService } from './excel/excel.service';

@Component({
    templateUrl: 'registry.component.pug',
    providers: [
        RegistryExportService,
        RegistryDataService,
        ExcelService
    ]
})
export class RegistryComponent implements OnInit {

    public shopID: string;
    public dateRange: DateRange;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private registryDataService: RegistryDataService,
        private registryExportService: RegistryExportService
    ) { }

    public ngOnInit() {
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }

    public selectDateRange(dateRange: DateRange) {
        this.dateRange = dateRange;
    }

    public exportRegistryToXLSX() {
        this.isLoading = true;
        this.registryDataService.getRegistry(this.shopID, this.dateRange.fromTime, this.dateRange.toTime).subscribe((registry) => {
            this.registryExportService.exportRegistryToXLSX(registry);
            this.isLoading = false;
        });
    }
}
