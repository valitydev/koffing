import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ContractorTransfer } from '../../shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer';
import { PaytoolTransfer } from '../../shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer';
import { ShopDetailTransfer } from '../../shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer';
import { ShopEditingTransfer } from '../../shops/shop-editing/edit-shop/shop-editing-transfer';
import { CreatePayoutToolComponent } from '../../shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';
import { ClaimData } from './claim-data';
import { ClaimDataService } from './claim-data.service';
import { ClaimsEditService } from './claims-edit.service';

@Component({
    selector: 'kof-claims-edit',
    templateUrl: 'claims-edit.component.pug',
    providers: [
        ClaimDataService,
        ClaimsEditService
    ]
})
export class ClaimsEditComponent implements OnInit {

    public claimData: ClaimData;
    public isLoading: boolean = false;
    public initComponents: boolean = false;
    private contractorReady: boolean;
    private paytoolReady: boolean;
    private shopReady: boolean;
    private formsTouched: boolean = false;
    @ViewChild('createPaytool')
    private createPaytoolComponent: CreatePayoutToolComponent;

    constructor(
        private claimsEditService: ClaimsEditService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.getClaimData();
    }

    public onContractorChange(value: ContractorTransfer) {
        this.formsTouched = true;
        this.contractorReady = value.valid;
        this.claimData.contractor = value.contractor;
        if (this.createPaytoolComponent) {
            this.createPaytoolComponent.compareAccounts();
        }
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.formsTouched = true;
        this.paytoolReady = value.valid;
        this.claimData.payoutToolParams = value.payoutToolParams;
    }

    public onShopFieldsChange(value: ShopDetailTransfer) {
        this.formsTouched = true;
        this.shopReady = value.valid;
        this.claimData.shop.details = value.shopDetail;
    }
    
    public onShopEditingChange(value: ShopEditingTransfer) {
        if (value.dirty) {
            this.formsTouched = true;
        }
        this.claimData.shopEditingParams.valid = value.valid;
        this.claimData.shopEditingParams.dirty = value.dirty;
        this.claimData.shopEditingParams.updatedShopParams = value.shopEditing;
    }

    public canSubmit(): boolean {
        let canSubmit = false;
        if (this.formsTouched) {
            canSubmit = true;
            canSubmit = canSubmit && (this.claimData.contractor ? this.contractorReady : true);
            canSubmit = canSubmit && (this.claimData.payoutToolParams ? this.paytoolReady : true);
            canSubmit = canSubmit && (this.claimData.shop ? this.shopReady : true);
            if (this.claimData.shopEditingParams) {
                if (!this.claimData.contractor && !this.claimData.payoutToolParams && !this.claimData.shop) {
                    canSubmit = canSubmit && this.claimData.shopEditingParams.dirty && this.claimData.shopEditingParams.valid;
                } else {
                    canSubmit = canSubmit && this.claimData.shopEditingParams.valid;
                }
            }
        }
        return canSubmit;
    }

    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public saveChanges() {
        this.isLoading = true;
        this.claimsEditService.saveChanges(this.claimData).then(() => {
            this.isLoading = false;
            this.returnToManagement();
        });
    }

    private handleClaimData(claimData: ClaimData) {
        this.claimData = claimData;
        this.contractorReady = Boolean(claimData.contractor);
        this.paytoolReady = Boolean(claimData.payoutToolParams);
        this.shopReady = Boolean(claimData.shop);
    }

    private getClaimData() {
        this.isLoading = true;
        this.claimsEditService.getClaimData().then((claimData: ClaimData) => {
            this.handleClaimData(claimData);
            this.isLoading = false;
            _.delay(() => {
                // TODO: здесь разрывается синхронное отображение компонентов после переключения флага isLoading,
                // TODO: т.к. иначе не успевает отрендериться DOM в компонентах
                // TODO: пока решение такое, но нужно найти более изящное/правильное
                this.initComponents = true;
            }, 0);
        });
    }
}
