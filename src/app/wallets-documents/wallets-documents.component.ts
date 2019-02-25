import { Component } from '@angular/core';
import { ReportType } from 'koffing/backend/wapi/model/report';

@Component({
    templateUrl: 'wallets-documents.component.pug'
})
export class WalletsDocumentsComponent {
    public reportTypes = ReportType;
}
