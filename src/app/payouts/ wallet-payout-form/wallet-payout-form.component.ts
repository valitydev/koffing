import { OnInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WalletPayoutFormService } from 'koffing/payouts/ wallet-payout-form/wallet-payout-form.service';
import { SelectItem } from 'koffing/common/select/select-item';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { Observable } from 'rxjs';
import { Shop, PayoutTool } from 'koffing/backend';

@Component({
    selector: 'kof-wallet-payout-form',
    templateUrl: 'wallet-payout-form.component.pug'
})
export class WalletPayoutFormComponent implements OnInit {

    @Input()
    public shop: Observable<Shop>;

    public walletPayoutForm: FormGroup;

    public payoutTools: SelectItem[];

    private wallets: PayoutTool[];

    constructor(
        private walletPayoutFormService: WalletPayoutFormService,
        private payoutToolService: PayoutToolService) { }

    public ngOnInit() {
        this.shop.subscribe(shop => {
            this.payoutToolService.getPayoutTools(shop.contractID).subscribe((tools) => {
                this.wallets = tools.filter((tool) => tool.details.detailsType === 'PayoutToolDetailsWalletInfo');
                const items = this.wallets.map((wallet) => new SelectItem(wallet.id, `${wallet.details.walletID} (${wallet.currency})`));
                this.payoutTools = items;
            });
        });
        this.walletPayoutForm = this.walletPayoutFormService.walletPayoutForm;
    }

    public setDefaultValues() {
        this.walletPayoutFormService.setDefaultValues();
    }

    private walletSelected(value: string) {
        const currency = this.wallets.find((element) => element.id === value).currency;
        console.info(this.walletPayoutForm);
        this.walletPayoutForm.patchValue({ currency });
    }
}
