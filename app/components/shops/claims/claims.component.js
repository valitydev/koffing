shops.component('claims', {
    templateUrl: 'components/shops/claims/claims.template.html',
    controller: function (Claims) {
        Claims.get({claimStatus: 'pending'}, claim => {
            this.claimID = claim.id;
            this.status = claim.status;
        });

        this.revoke = () => {
            const claims = new Claims();
            claims.$revoke({claimID: this.claimID});
        };
    }
});
