import { Contractor } from './contractor';

export class Contract {
    public id: number;
    public contractor: Contractor;
    public status: string;
    public validSince: string;
    public validUntil: string;
    public terminatedAt: string;

    constructor() {
        this.contractor = new Contractor();
    }
}
