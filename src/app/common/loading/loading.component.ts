import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-loading',
    templateUrl: 'loading.component.pug'
})
export class LoadingComponent {
    @Input()
    public isLoading: boolean;
}
