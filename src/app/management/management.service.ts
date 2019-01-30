import { Injectable } from '@angular/core';
import { ClaimService } from 'koffing/backend/claim.service';
import { testShopClaimChangeset } from './test-shop-claim-changeset';
import { Observable } from 'rxjs/Observable';
import { Shop } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';

@Injectable()
export class ManagementService {
    constructor(private claimService: ClaimService, private shopService: ShopService) {}

    public createTestShop(): Observable<Shop[]> {
        return this.claimService
            .createClaim(testShopClaimChangeset())
            .switchMap(() => this.shopService.getShops());
    }
}
