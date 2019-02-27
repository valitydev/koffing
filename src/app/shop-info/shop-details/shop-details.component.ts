import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Shop, Category } from 'src/app/backend';
import { CategoryService } from 'src/app/backend/category.service';

@Component({
    selector: 'kof-shop-details',
    templateUrl: 'shop-details.component.pug'
})
export class ShopDetailsComponent implements OnChanges {
    @Input()
    public shop: Shop;

    public category: Category;

    constructor(private categoryService: CategoryService) {}

    public ngOnChanges() {
        if (this.shop && this.shop.categoryID) {
            this.loadCategory(this.shop.categoryID);
        }
    }

    public getShopLabel(): string {
        if (this.shop) {
            return this.shop.isBlocked
                ? 'label-danger'
                : this.shop.isSuspended
                ? 'label-warning'
                : 'label-success';
        }
    }

    public getShopStatus(): string {
        if (this.shop) {
            return this.shop.isBlocked
                ? 'Заблокирован'
                : this.shop.isSuspended
                ? 'Заморожен'
                : 'Активен';
        }
    }

    private loadCategory(categoryID: number) {
        this.categoryService.getCategoryByID(categoryID).subscribe(category => {
            this.category = category;
        });
    }
}
