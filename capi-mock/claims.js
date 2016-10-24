const shops = require('./shops');

var claimStatus = {
    status: 'ClaimPending'
};

var shopCreation = {
    modificationType: 'ShopCreation',
    shop: shops[0]
};

var shopModification = {
    modificationType: 'ShopModificationUnit',
    shopID: 'THRIFT-SHOP',
    details: {
        modificationType: 'ShopModification',
        details: {
            shopDetails : {
                name: 'Test name',
                description: 'Test description',
                location: 'Moscow'
            },
            contractor: {
                registeredName: 'Registered test name',
                legalEntity: 'Legal entity'
            },
            categoryRef: '1'
        }
    }
};

module.exports = {
    id: '1',
    status: claimStatus,
    changeset: [shopCreation, shopModification]
};
