import { Entity } from './entity.class';

export class RussianLegalEntity extends Entity {
    public registeredName: string;
    public registeredNumber: string;
    public inn: string;
    public actualAddress: string;
    public postAddress: string;
    public representativePosition: string;
    public representativeFullName: string;
    public representativeDocument: string;
}
