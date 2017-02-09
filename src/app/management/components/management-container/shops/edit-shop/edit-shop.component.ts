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

@Component({
    selector: 'kof-edit-shop',
    templateUrl: 'edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public shopID: number = Number(this.route.snapshot.params['shopID']);
    public shopEditing: CreateShopArgs;
    public shop: Shop;
    public shopContract: Contract;
    public shopPayoutTool: PayoutTool;
    public contracts: Contract[] = [];
    public payoutTools: PayoutTool[] = [];

    public contractItems: SelectItem[] = [];
    public payoutToolItems: SelectItem[] = [];
    public categoryItems: SelectItem[] = [];

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
        if (_.startsWith(path, 'details')) {
            this.shopEditing.details = this.shop.details;
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

    public loadShop(): Promise<Shop> {
        return new Promise((resolve) => {
            this.shopService.getShop(this.shopID).then((shop: Shop) => {
                this.shop = shop;
                Promise.all([
                    this.loadShopContracts(),
                    this.loadShopPayoutTools(shop.contractID)
                ]).then(() => {
                    resolve(shop);
                });
            });
        });
    }

    public loadShopContracts(): Promise<Contract[]> {
        return new Promise((resolve) => {
            this.contractService.getContracts().then((contracts: Contract[]) => {
                this.contracts = contracts;
                this.shopContract = this.findContract(this.shop.contractID);
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
                this.shopPayoutTool = payoutTools[0];
                resolve(payoutTools);
            });
        });
    }

    public selectContract(contractID: string) {
        const id = Number(contractID);
        this.shopEditing.contractID = id;
        this.shopContract = this.findContract(id);
        this.loadShopPayoutTools(id);
    }

    public selectPayoutTool(payoutToolID: string) {
        const id = Number(payoutToolID);
        this.shopEditing.payoutToolID = Number(id);
        this.shopPayoutTool = this.findPayoutTool(id);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        if (form.valid) {
            this.isLoading = true;
            this.shopEditing.details.name = this.fillShopName();
            this.shopService.updateShop(this.shopID, this.shopEditing).then(() => {
                this.isLoading = false;
                this.router.navigate(['/management']);
            });
        }
    }

    public onSelectCategory(categoryID: string) {
        this.shopEditing.categoryID = _.toNumber(categoryID);
    }

    private fillShopName() {
        const detailsName = this.shopEditing.details.name;
        return detailsName ? detailsName : this.shop.details.name;
    }

    private findPayoutTool(payoutToolID: number) {
        return _.find(this.payoutTools, (payoutTool) => payoutTool.id === payoutToolID);
    }

    private findContract(contractID: number): Contract {
        return _.find(this.contracts, (contract) => contract.id === contractID);
    }

    private getInstance(): CreateShopArgs {
        const shopDetail = new ShopDetail();
        const instance = new CreateShopArgs();
        instance.details = shopDetail;
        return instance;
    }
}
