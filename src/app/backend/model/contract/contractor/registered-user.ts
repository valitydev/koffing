import { Contractor } from './contractor';

export class RegisteredUser extends Contractor {
    public email: string;

    constructor() {
        super();
        this.contractorType = 'RegisteredUser';
    }
}
