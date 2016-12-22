import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GrowlModule } from 'primeng/primeng';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { RootRoutingModule } from './root-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ShopsModule } from '../shops/shops.module';
import { BroadcasterModule } from '../broadcaster/broadcaster.module';
import { HttpErrorHandleComponent } from './components/http-error-handle/http-error-handle.component';

@NgModule({
    imports: [
        RootRoutingModule,
        AnalyticsModule,
        ShopsModule,
        TokenizationModule,
        BrowserModule,
        BroadcasterModule,
        GrowlModule
    ],
    declarations: [
        ContainerComponent,
        SidebarComponent,
        TopPanelComponent,
        HttpErrorHandleComponent
    ]
})
export class RootModule { }

export * from './components/container/container.component';
export * from './components/sidebar/sidebar.component';
export * from './components/top-panel/top-panel.component';
export * from './components/http-error-handle/http-error-handle.component';
