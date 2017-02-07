export class PaytoolDecision {
    public contractID: number;
    public payoutToolID: number;

    constructor(contractID?: number, payoutToolID?: number) {
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
    }
}
