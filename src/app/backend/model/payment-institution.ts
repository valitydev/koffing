export enum PaymentInstitutionRealms {
    test = 'test',
    live = 'live'
}

export class PaymentInstitution {
    public id: number;
    public name: string;
    public description: string;
    public residences: string[];
    public realm: PaymentInstitutionRealms;
}
