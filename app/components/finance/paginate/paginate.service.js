paginate.factory('Paginate', function () {
    return function (size, limit, offset) {
        function calcPages(size, limit) {
            if (limit === 0 || size < limit) {
                return 0;
            }
            var res = size / limit;
            return (size % limit > 0) ? res + 1 : res;
        }

        function initParam(param) {
            var number = _.toNumber(param);
            return _.isNaN(number) ? 0 : number;
        }

        function initPages(itemsSize, itemsLimit, itemsOffset) {
            const size = initParam(itemsSize);
            const limit = initParam(itemsLimit);
            const offset = initParam(itemsOffset);
            const pages = [];
            for (let page = 1; page <= calcPages(size, limit); page++) {
                const calcOffset = (page - 1) * limit;
                pages.push({
                    active: calcOffset === offset,
                    label: page,
                    offset: calcOffset
                });
            }
            return pages;
        }

        function getActive(pages) {
            return _.find(pages, page => page.active);
        }

        this.pages = initPages(size, limit, offset);

        this.activatePage = activated => {
            getActive(this.pages).active = false;
            activated.active = true;
            return activated;
        };

        this.forward = () => {
            var index = _.indexOf(this.pages, getActive(this.pages)) + 1;
            if (this.pages.length > index) {
                return this.activatePage(this.pages[index]);
            }
        };

        this.back = () => {
            var index = _.indexOf(this.pages, getActive(this.pages)) - 1;
            if (index >= 0) {
                return this.activatePage(this.pages[index]);
            }
        }
    }
});
