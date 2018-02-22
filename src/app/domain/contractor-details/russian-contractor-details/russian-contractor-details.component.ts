import { Component, Input } from '@angular/core';
import { Contractor } from 'koffing/backend';

@Component({
    selector: 'kof-russian-contractor-details',
    templateUrl: 'russian-contractor-details.component.pug'
})
export class RussianContractorDetailsComponent {

    @Input()
    public contractor: Contractor;

}
