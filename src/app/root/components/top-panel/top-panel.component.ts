import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {
    ToggleMenuBroadcaster,
    BreadcrumbConfig,
    BreadcrumbBroadcaster
} from 'koffing/broadcaster';

enum Links {
    shop = 'shop',
    wallets = 'wallets'
}

@Component({
    selector: 'kof-top-panel',
    templateUrl: 'top-panel.component.pug',
    styleUrls: ['top-panel.component.less']
})
export class TopPanelComponent implements OnInit {
    public breadcrumbConfig: BreadcrumbConfig[] = [];
    private activeLink: Links;
    private links = Links;

    private initialBreadcrumbConfig: BreadcrumbConfig[] = [
        {
            label: 'Главная',
            routerLink: '/'
        }
    ];

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster,
        private breadcrumbBroadcaster: BreadcrumbBroadcaster,
        private router: Router
    ) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                for (const link in Links) {
                    if (e.url.search(new RegExp(`^/${link}`, 'g')) !== -1) {
                        this.activeLink = link as Links;
                    }
                }
            }
        });
    }

    public ngOnInit() {
        this.breadcrumbBroadcaster.on().subscribe((config: BreadcrumbConfig[]) => {
            this.breadcrumbConfig = this.initialBreadcrumbConfig.concat(config);
        });
    }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }
}
