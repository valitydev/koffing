var shop1 = {
    shopID: 'THRIFT-SHOP',
    isBlocked: false,
    isSuspended: false,
    categoryRef: 1,
    shopDetails: {
        name: 'Shop 1',
        description: 'shop 1 description',
        location: 'Moscow'
    },
    contractor: {
        registeredName: 'Registered name',
        legalEntity: 'legalEntity'
    },
    contract: {
        number: '2341',
        systemContractorRef: '34564',
        concludedAt: 'concludedAt',
        validSince: 'validSince',
        validUntil: 'validUntil',
        terminatedAt: 'terminatedAt'
    }
};

var shop2 = {
    shopID: 'THRIFT-SHOP2',
    isBlocked: false,
    isSuspended: false,
    categoryRef: 1,
    shopDetails: {
        name: 'Shop 2',
        description: 'shop 2 description',
        location: 'Moscow'
    },
    contractor: {
        registeredName: 'Registered name',
        legalEntity: 'legalEntity'
    },
    contract: {
        number: '4532',
        systemContractorRef: '33422',
        concludedAt: 'concludedAt',
        validSince: 'validSince',
        validUntil: 'validUntil',
        terminatedAt: 'terminatedAt'
    }
};

module.exports = {
    partyID: '1',
    isBlocked: false,
    isSuspended: false,
    shops: [shop1, shop2]
};
