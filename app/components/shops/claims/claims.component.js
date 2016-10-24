shops.component('claims', {
    templateUrl: 'components/shops/claims/claims.template.html',
    controller: function (Claims) {
        this.showClaimInfo = false;

        Claims.get({claimStatus: 'pending'}, claim => {
            this.claimID = claim.id;
            this.showClaimInfo = true;
            this.changeset = claim.changeset;
        });

        this.revoke = () => {
            const claims = new Claims({
                reason: 'test' //TODO fix it
            });
            claims.$revoke({claimID: this.claimID}, () => {
                this.showClaimInfo = false;
            });
        };
    }
});
