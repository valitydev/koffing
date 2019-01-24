import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WalletPayoutFormService } from '../ wallet-payout-form/wallet-payout-form.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'koffing/backend/shop.service';
import { Shop } from 'koffing/backend';
import { Observable } from '../../../../node_modules/rxjs';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { CreateWalletPayoutService } from 'koffing/payouts/create-wallet-payout/create-wallet-payout.service';

@Component({
    selector: 'kof-create-wallet-payout',
    templateUrl: 'create-wallet-payout.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class CreateWalletPayoutComponent implements OnInit {

    public shop: Observable<Shop>;
    public walletPayoutForm: FormGroup;

    private shopID: string;

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private walletPayoutFormService: WalletPayoutFormService,
        private payoutToolService: PayoutToolService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.loadShop(this.shopID);
        });
        this.walletPayoutForm = this.walletPayoutFormService.walletPayoutForm;
    }

    public createPayout() {
        const bodyPayout = CreateWalletPayoutService.getCreatePayoutParams(this.walletPayoutForm.value, this.shopID);
        this.payoutToolService.createPayout(bodyPayout).subscribe((res) => {
            console.info('payout created');
        });
    }

    public setDefaultFormValues() {
        this.walletPayoutFormService.setDefaultValues();
    }

    private loadShop(shopID: string) {
        this.shop = this.shopService.getShopByID(shopID);
    }
}
