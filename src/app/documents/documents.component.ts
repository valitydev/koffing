import { Component } from '@angular/core';
import { ReportType } from 'koffing/backend';

@Component({
    templateUrl: 'documents.component.pug'
})
export class DocumentsComponent {
    public reportTypes = ReportType;
}
