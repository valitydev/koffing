import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { Category } from 'koffing/backend/classes/category.class';
import { SelectItem } from 'koffing/common/common.module';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { ShopDetails } from 'koffing/backend/backend.module';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';
import { ShopEditingTransfer } from './shop-editing-transfer.class';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: 'edit-shop.component.pug',
})
export class EditShopComponent implements OnInit, AfterViewInit {

    @Input()
    public shop: Shop;
    @Input()
    public defaultShopChanges: ShopParams;
    public shopEditing: ShopParams;
    public selectedContract: Contract;
    public selectedPayoutTool: PayoutTool;
    public contracts: Contract[] = [];
    public payoutTools: PayoutTool[] = [];
    @Output()
    public onChange = new EventEmitter();
    @ViewChild('form')
    public form: NgForm;

    public contractItems: SelectItem[] = [];
    public payoutToolItems: SelectItem[] = [];
    public categoryItems: SelectItem[] = [];

    public isLoading: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private contractService: ContractService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        Promise.all([
            this.loadCategories(),
            this.loadShopContracts(),
            this.loadShopPayoutTools(this.shop.contractID)
        ]).then(() => {
            this.isLoading = false;
            this.shopEditing = this.getInstance(this.shop.details);
        });
    }

    public ngAfterViewInit() {
        this.form.statusChanges.subscribe((data) => {
            this.onFormStatusChanges(data);
        });
    }

    public onFormStatusChanges(formStatus: string) {
        this.emitData();
    }

    public emitData() {
        const transfer = new ShopEditingTransfer(this.shopEditing, this.form.valid, this.form.dirty);
        this.onChange.emit(transfer);
    }

    public onFieldChange(path: string, value: any) {
        if (_.startsWith(path, 'details')) {
            this.shopEditing.details = this.shop.details;
        }
        if (_.startsWith(path, 'details.location')) {
            this.shopEditing.details.location = new ShopLocationUrl();
        }
        _.set(this.shopEditing, path, value);
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then((categories: Category[]) => {
                this.categoryItems = _.map(categories, (category) => new SelectItem(category.categoryID, category.name));
                resolve(categories);
            });
        });
    }

    public loadShopContracts(): Promise<Contract[]> {
        return new Promise((resolve) => {
            this.contractService.getContracts().then((contracts: Contract[]) => {
                this.contracts = contracts;
                this.selectedContract = this.findContract(this.shop.contractID);
                this.contractItems = _.map(contracts, (contract) => new SelectItem(contract.id, contract.id));
                resolve(contracts);
            });
        });
    }

    public loadShopPayoutTools(contractID: number): Promise<PayoutTool[]> {
        return new Promise((resolve) => {
            this.contractService.getPayoutTools(contractID).then((payoutTools: PayoutTool[]) => {
                this.payoutTools = payoutTools;
                this.payoutToolItems = _.map(payoutTools, (payoutTool) => new SelectItem(payoutTool.id, payoutTool.id));
                this.selectedPayoutTool = payoutTools[0];
                resolve(payoutTools);
            });
        });
    }

    public onSelectContract(contractID: string) {
        const id = Number(contractID);
        this.shopEditing.contractID = id;
        this.selectedContract = this.findContract(id);
        this.shopEditing.payoutToolID = undefined;
        this.loadShopPayoutTools(id).then(payoutTools => {
            if (payoutTools.length) {
                this.shopEditing.payoutToolID = payoutTools[0].id;
            }
        });
    }

    public onSelectPayoutTool(payoutToolID: string) {
        const id = Number(payoutToolID);
        this.shopEditing.payoutToolID = id;
        this.selectedPayoutTool = this.findPayoutTool(id);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public onSelectCategory(categoryID: string) {
        this.shopEditing.categoryID = _.toNumber(categoryID);
    }

    private findPayoutTool(payoutToolID: number) {
        return _.find(this.payoutTools, (payoutTool) => payoutTool.id === payoutToolID);
    }

    private findContract(contractID: number): Contract {
        return _.find(this.contracts, (contract) => contract.id === contractID);
    }

    private getInstance(details: ShopDetails): ShopParams {
        const instance = new ShopParams();
        instance.details = details;
        if (this.defaultShopChanges) {
            instance.update(this.defaultShopChanges);
        }
        return instance;
    }
}
