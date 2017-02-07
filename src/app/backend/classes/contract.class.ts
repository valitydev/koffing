import { Contractor } from './contractor.class';

export class Contract {
    public id: number;
    public contractor: Contractor;
    public validSince: string;
    public validUntil: string;
    public terminatedAt: string;

    constructor() {
        this.contractor = new Contractor();
    }
}
