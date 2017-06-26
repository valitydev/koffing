import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from './action';

@Component({
    selector: 'kof-actions',
    templateUrl: './actions.component.pug'
})
export class ActionsComponent {

    @Output()
    public onAction: EventEmitter<Action> = new EventEmitter();

    @Input()
    public activeAction: Action;

    public action = Action;

    public select(action: Action) {
        this.activeAction = (this.activeAction === action) ? Action.none : action;
        this.onAction.emit(this.activeAction);
    }

    public getClass(action: Action) {
        return this.activeAction === action ? 'fa-caret-down' : 'fa-caret-right';
    }
}
