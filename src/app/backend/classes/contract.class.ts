import { Contractor } from './contractor.class';

export class Contract {
    public id: number;
    public contractor: Contractor;
    public concludedAt: string;
    public terminatedAt: string;
}
