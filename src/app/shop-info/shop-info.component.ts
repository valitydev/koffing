import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

import { Shop, Contract, PayoutTool } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { MODIFICATION_TYPE } from 'koffing/management/modification-type';
import { ShopInfoService } from './shop-info.service';
import { RussianLegalEntity, InternationalLegalEntity, LegalEntityTypeEnum } from 'koffing/backend';

@Component({
    templateUrl: 'shop-info.component.pug',
    providers: [ShopInfoService]
})
export class ShopInfoComponent implements OnInit {

    public shop: Shop;
    public contract: Contract;
    public payoutTool: PayoutTool;
    public messages: Message[] = [];
    public messageLifeTime: number = 1000;
    public isDisabledContractChange: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private contractService: ContractService,
        private payoutToolService: PayoutToolService,
        private shopInfoService: ShopInfoService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            const shopID = params['shopID'];
            this.loadShop(shopID);
            this.shopInfoService.checkExistenceClaim(shopID, MODIFICATION_TYPE.ShopContractBinding).subscribe((isExist) => {
                this.isDisabledContractChange = isExist;
            });
        });
    }

    public navigateToContractChange() {
        this.router.navigate(['shop', this.shop.id, 'contract', this.getContractType(this.contract)]);
    }

    public activateShop() {
        this.shopService.activateShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
            this.showMessage('Магазин активирован');
        });
    }

    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
            this.showMessage('Магазин заморожен');
        });
    }

    private loadShop(shopID: string) {
        this.shopService.getShopByID(shopID).subscribe((shop) => {
            this.shop = shop;
            this.loadContract(shop.contractID);
            this.loadPayoutTool(shop.contractID, shop.payoutToolID);
        });
    }

    private loadContract(contractID: string) {
        this.contractService.getContractByID(contractID).subscribe((contract) => {
            this.contract = contract;
        });
    }
    
    private loadPayoutTool(contractID: string, payoutToolID: string) {
        this.payoutToolService.getPayoutToolByID(contractID, payoutToolID).subscribe((payoutTool) => {
            this.payoutTool = payoutTool;
        });
    }

    private showMessage(message: string) {
        this.messages = [];
        this.messages.push({
            severity: 'success',
            summary: '',
            detail: message
        });
    }

    private getContractType(contract: Contract): string {
        const contractor = contract.contractor as RussianLegalEntity | InternationalLegalEntity;
        switch (contractor.entityType) {
            case LegalEntityTypeEnum.InternationalLegalEntity:
                return 'nonresident';
            case LegalEntityTypeEnum.RussianLegalEntity:
                return 'resident';
        }
    }
}
