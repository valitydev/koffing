import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Claim, Shop, Contract, PayoutTool, ShopContractBinding, PartyModification } from 'koffing/backend';
import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';

@Component({
    templateUrl: 'contract-manage.component.pug'
})
export class ContractManageComponent implements OnInit {

    public shop: Shop;
    public selectedContract: Contract;
    public selectedPayoutTool: PayoutTool;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.loadShop(params.shopID);
        });
    }

    public loadShop(shopID: string) {
        this.shopService.getShopByID(shopID).subscribe((shop: Shop) => this.shop = shop);
    }

    public selectContract(contract: Contract) {
        this.selectedContract = contract;
    }

    public selectPayoutTool(payoutTool: PayoutTool) {
        this.selectedPayoutTool = payoutTool;
    }

    public bindContract() {
        const shopContractBinding = new ShopContractBinding(this.shop.id, this.selectedContract.id, this.selectedPayoutTool.id);
        this.claimService.createClaim([shopContractBinding]).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public createAndBindContract(changeSet: PartyModification[]) {
        this.claimService.createClaim(changeSet).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public navigateBack() {
        this.router.navigate(['shop', this.shop.id, 'info']);
    }

    public navigateToRoot() {
        this.router.navigate(['/']);
    }
}
