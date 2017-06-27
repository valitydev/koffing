import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-modification-detail',
    templateUrl: 'modification-detail.component.pug',
    styles: [`.modification-detail-value { word-wrap: break-word }`]
})
export class ModificationDetailComponent {

    @Input()
    public displayName: string;

    @Input()
    public value: string;
}
