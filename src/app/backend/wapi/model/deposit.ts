export enum DepositStatus {
    Pending = 'Pending',
    Succeeded = 'Succeeded',
    Failed = 'Failed'
}

export interface Deposit {
    id: string;
    createdAt: string;
    wallet: string;
    source: string;
    body: {
        amount: number;
        currency: string;
    };
    fee: {
        amount: number;
        currency: string;
    };
    externalID: string;
    status: DepositStatus;
    failure: {
        code: string;
    };
}
