import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { Category } from 'koffing/backend/classes/category.class';
import { SelectItem } from 'koffing/common/common.module';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';
import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: 'edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public shopID: number = Number(this.route.snapshot.params['shopID']);
    public shopEditing: CreateShopArgs;
    public shop: Shop;
    public shopContract: Contract = new Contract();
    public shopPayoutTool: PayoutTool = new PayoutTool();
    public contracts: Contract[] = [];
    public payoutTools: PayoutTool[] = [];

    public contractItems: SelectItem[] = [];
    public payoutToolItems: SelectItem[] = [];
    public categoryItems: SelectItem[] = [];

    public isShowContractDetails: boolean = false;
    public isShowPayoutAccountDetails: boolean = false;
    public isLoading: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private categoryService: CategoryService,
                private shopService: ShopService,
                private contractService: ContractService) {
    }

    public ngOnInit() {
        this.shopEditing = this.getInstance();
        this.isLoading = true;
        Promise.all([
            this.loadCategories(),
            this.loadShop()
        ]).then(() => {
            this.isLoading = false;
        });
    }

    public onFieldChange(path: string, value: any) {
        _.set(this.shopEditing, path, value);
        if (path === 'details.location.url') { // TODO fix it
            const location = new ShopLocationUrl();
            location.url = value;
            this.shopEditing.details.location = location;
        }
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then((categories: Category[]) => {
                this.categoryItems = _.map(categories, (category) => new SelectItem(category.categoryID, category.name));
                resolve(categories);
            });
        });
    }

    public loadShop(): Promise<Shop> {
        return new Promise((resolve) => {
            this.shopService.getShop(this.shopID).then((shop: Shop) => {
                Promise.all([
                    this.loadShopContracts(),
                    this.loadShopPayoutTools()
                ]).then(() => {
                    this.shop = shop;
                    resolve(shop);
                });
            });
        });
    }

    public loadShopContracts(): Promise<Contract[]> {
        return new Promise((resolve) => {
            this.contractService.getContracts().then((contracts: Contract[]) => {
                this.contracts = contracts;
                this.shopContract = _.find(contracts, (contract) => contract.id === this.shopEditing.contractID);
                this.contractItems = _.map(contracts, (contract) => new SelectItem(contract.id, contract.id));
                resolve(contracts);
            });
        });
    }

    public loadShopPayoutTools(): Promise<PayoutTool[]> {
        return new Promise((resolve) => {
            if (this.shopEditing.contractID) {
                this.contractService.getPayoutTools(this.shopEditing.contractID).then((payoutTools: PayoutTool[]) => {
                    this.payoutTools = payoutTools;
                    this.shopPayoutTool = _.find(payoutTools, (payoutTool) => payoutTool.id === this.shopEditing.payoutToolID);
                    if (!this.shopPayoutTool) {
                        this.shopPayoutTool = payoutTools[0];
                        this.shopEditing.payoutToolID = this.shopPayoutTool.id;
                    }
                    this.payoutToolItems = _.map(payoutTools, (payoutTool) => new SelectItem(payoutTool.id, payoutTool.id));
                    resolve(payoutTools);
                });
            } else {
                resolve();
            }
        });
    }

    public selectContract(contractID: string) {
        this.shopEditing.contractID = Number(contractID);
        // this.shopContract = _.find(this.contracts, (contract) => contract.id === this.shopEditing.contractID);
        // this.loadShopPayoutTools();
    }

    public selectPayoutTool(payoutToolID: string) {
        this.shopEditing.payoutToolID = Number(payoutToolID);
        this.shopPayoutTool = _.find(this.payoutTools, (payoutTool) => payoutTool.id === this.shopEditing.payoutToolID);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        if (form.valid) {
            this.isLoading = true;
            const detailsName = this.shopEditing.details.name;
            this.shopEditing.details.name = detailsName ? detailsName : this.shop.details.name; // TODO fix it
            if (this.shopEditing.categoryID) { // TODO fix it
                this.shopEditing.categoryID = _.toNumber(this.shopEditing.categoryID);
            }
            this.shopService.updateShop(this.shopID, this.shopEditing).then(() => {
                this.isLoading = false;
                this.router.navigate(['/management']);
            });
        }
    }

    public onSelectCategory(categoryID: string) {
        this.shopEditing.categoryID = _.toNumber(categoryID);
    }

    private getInstance(): CreateShopArgs {
        const shopDetail = new ShopDetail();
        const instance = new CreateShopArgs();
        instance.details = shopDetail;
        return instance;
    }
}
