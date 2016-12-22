export class ShopModification {

    public modificationType: string;

    public shopID: string;

    public details: {
        modificationType: string;
        details: {
            shopDetails: {
                name: string;
                description: string;
                location: string;
            },
            contractor: {
                registeredName: string;
                legalEntity: string;
            },
            categoryRef: string;
        }
    };
}
