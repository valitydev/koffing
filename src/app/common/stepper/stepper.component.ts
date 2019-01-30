import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'kof-stepper',
    templateUrl: 'stepper.component.pug'
})
export class StepperComponent {
    @Input()
    public hasNext: boolean;

    @Input()
    public page: number = 1;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    public hasPrevious() {
        return this.page > 1;
    }

    public forward(event: MouseEvent) {
        event.preventDefault();
        this.changePage(1);
    }

    public back(event: MouseEvent) {
        event.preventDefault();
        this.changePage(-1);
    }

    public stay(event: MouseEvent) {
        event.preventDefault();
    }

    public changePage(num: number) {
        this.onChange.emit(num);
    }
}
