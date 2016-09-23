var shop = {
    shopID: 'THRIFT-SHOP',
    isBlocked: false,
    isSuspended: false,
    categoryRef: 1,
    shopDetails: {
        name: 'Лееееех, да ответь же ты',
        description: 'Магазин пропавшего Лехи',
        location: 'Стена'
    },
    contractor: {
        registeredName: 'Леха Свотин',
        legalEntity: 'Хер знает что за поле'
    },
    contract: {
        number: '2341',
        systemContractorRef: '34564',
        concludedAt: 'Наверно дата и время',
        validSince: 'Какая то дата и время',
        validUntil: 'Какая то дата и время',
        terminatedAt: 'Наверно дата и время'
    }
};

module.exports = {
    partyID: '1',
    isBlocked: false,
    isSuspended: false,
    shops: [shop]
};
