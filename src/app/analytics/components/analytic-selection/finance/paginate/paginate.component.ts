import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { CalculatePagesService } from './calculate-pages.service';

@Component({
    selector: 'kof-paginate',
    templateUrl: 'paginate.component.pug'
})
export class PaginateComponent implements OnChanges {

    @Input()
    public size: number;

    @Input()
    public limit: number;

    @Input()
    public offset: number;

    @Input()
    public pagesOnScreen: number;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    private pages: any[];

    public select(event: MouseEvent, page: any) {
        event.preventDefault();
        return this.activatePage(page);
    }

    public forward(event: MouseEvent) {
        event.preventDefault();
        const index = _.indexOf(this.pages, this.getActive()) + 1;
        if (this.pages.length > index) {
            return this.activatePage(this.pages[index]);
        }
    }

    public back(event: MouseEvent) {
        event.preventDefault();
        const index = _.indexOf(this.pages, this.getActive()) - 1;
        if (index >= 0) {
            return this.activatePage(this.pages[index]);
        }
    }

    public getActive() {
        return _.find(this.pages, page => page.active);
    }

    public activatePage(page: any) {
        this.getActive().active = false;
        page.active = true;
        this.onChange.emit(page.offset);
        return page;
    }

    public pageOffset() {
        const currentPageIndex = (this.offset / this.limit);
        const offset = _.round(this.pagesOnScreen / 2);
        return currentPageIndex > offset ? currentPageIndex - offset : 0;
    }

    public ngOnChanges() {
        this.pages = CalculatePagesService.initPages(this.size, this.limit, this.offset);
    }
}
