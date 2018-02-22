import { Component, Input } from '@angular/core';
import { Contractor } from 'koffing/backend';

@Component({
    selector: 'kof-international-contractor-details',
    templateUrl: 'international-contractor-details.component.pug'
})
export class InternationalContractorDetailsComponent {

    @Input()
    public contractor: Contractor;
}
