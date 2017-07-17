import { Contractor } from './contractor/contractor';
import { LegalAgreement } from './legal-agreement';

export class Contract {
    public id: string;
    public createdAt: string;
    public status: string;
    public validSince: string;
    public validUntil: string;
    public terminatedAt: string;
    public contractor: Contractor;
    public legalAgreement: LegalAgreement;
}
