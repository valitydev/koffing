import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'analytics',
                component: AnalyticsComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule {}
