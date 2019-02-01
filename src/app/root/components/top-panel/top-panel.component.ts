import { Component, OnInit } from '@angular/core';

import { BreadcrumbBroadcaster, BreadcrumbConfig } from 'koffing/broadcaster';

@Component({
    selector: 'kof-top-panel',
    templateUrl: 'top-panel.component.pug',
    styleUrls: ['top-panel.component.less']
})
export class TopPanelComponent implements OnInit {
    public breadcrumbConfig: BreadcrumbConfig[] = [];

    private initialBreadcrumbConfig: BreadcrumbConfig[] = [
        {
            label: 'Главная',
            routerLink: '/'
        }
    ];

    constructor(private breadcrumbBroadcaster: BreadcrumbBroadcaster) {}

    public ngOnInit() {
        this.breadcrumbBroadcaster.on().subscribe((config: BreadcrumbConfig[]) => {
            this.breadcrumbConfig = this.initialBreadcrumbConfig.concat(config);
        });
    }
}
