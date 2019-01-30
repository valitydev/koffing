import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/primeng';

import { RootRoutingModule } from './root-routing.module';
import { BroadcasterModule } from '../broadcaster/broadcaster.module';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { ManagementModule } from '../management/management.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContainerComponent } from './components/container/container.component';
import { HttpErrorHandleComponent } from './components/http-error-handle/http-error-handle.component';
import { AccountModule } from 'koffing/account/account.module';
import { InvoicesModule } from 'koffing/invoices/invoices.module';
import { InvoiceModule } from 'koffing/invoice/invoice.module';
import { DocumentsModule } from 'koffing/documents/documents.module';
import { AnalyticsModule } from 'koffing/analytics/analytics.module';
import { ShopInfoModule } from 'koffing/shop-info/shop-info.module';
import { PayoutsModule } from 'koffing/payouts/payouts.module';
import { LandingContainerComponent } from './components/landing-container/landing-container.component';
import { LandingTopPanelComponent } from './components/landing-container/landing-top-panel/landing-top-panel.component';
import { TopPanelActionsComponent } from './components/top-panel-actions/top-panel-actions.component';
import { ShopSelectorComponent } from 'koffing/root/components/shop-container/shop-top-panel/shop-selector/shop-selector.component';
import { ShopTopPanelComponent } from 'koffing/root/components/shop-container/shop-top-panel/shop-top-panel.component';
import { ShopContainerComponent } from './components/shop-container/shop-container.component';
import { WalletsModule } from 'koffing/wallets/wallets.module';
import { WithdrawalModule } from 'koffing/withdrawal/withdrawal.module';
import { WalletsContainerComponent } from './components/wallets-container/wallets-container.component';
import { WalletsSidebarComponent } from './components/wallets-container/wallets-sidebar/wallets-sidebar.component';

@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        GrowlModule,
        FormsModule,
        RootRoutingModule,
        BroadcasterModule,
        TokenizationModule,
        ManagementModule,
        AccountModule,
        WebhooksModule,
        InvoicesModule,
        InvoiceModule,
        DocumentsModule,
        AnalyticsModule,
        ShopInfoModule,
        PayoutsModule,
        WalletsModule,
        WithdrawalModule
    ],
    declarations: [
        ContainerComponent,
        LandingContainerComponent,
        ShopContainerComponent,
        SidebarComponent,
        ShopTopPanelComponent,
        HttpErrorHandleComponent,
        ShopSelectorComponent,
        LandingTopPanelComponent,
        TopPanelActionsComponent,
        WalletsContainerComponent,
        WalletsSidebarComponent
    ]
})
export class RootModule {}

export * from './components/container/container.component';
export * from './components/sidebar/sidebar.component';
export * from './components/http-error-handle/http-error-handle.component';
