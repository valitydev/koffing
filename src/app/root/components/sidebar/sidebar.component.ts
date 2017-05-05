import { Component } from '@angular/core';

@Component({
    selector: 'kof-sidebar',
    templateUrl: './sidebar.component.pug'
})
export class SidebarComponent {
    public isOpenedSubMenu: any = {
        account: false,
        api: false
    };

    public toggleSubMenu(submenu: string) {
        this.isOpenedSubMenu[submenu] = !this.isOpenedSubMenu[submenu];
    }

    public closeSubMenu() {
        for (let prop in this.isOpenedSubMenu) {
            if (this.isOpenedSubMenu[prop] && this.isOpenedSubMenu.hasOwnProperty(prop)) {
                this.isOpenedSubMenu[prop] = !this.isOpenedSubMenu[prop];
            }
        }
    }
}
