import { Component, Input } from '@angular/core';
import { Contractor } from 'koffing/backend';

@Component({
    selector: 'kof-contractor-details',
    templateUrl: 'contractor-details.component.pug'
})
export class ContractorDetailsComponent {

    @Input()
    public contractor: Contractor;

}
