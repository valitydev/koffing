paginate.factory('Paginate', function () {
    return function (itemsSize, itemsOnPage) {
        function calcPages(size, limit) {
            const result = size / limit;
            const mod = size % limit;
            return mod > 0 ? result + 1 : result;
        }

        function validate(itemsSize, itemsOnPage) {
            return _.isNumber(itemsSize)
                && _.isNumber(itemsOnPage)
                && (itemsSize > itemsOnPage)
                && (itemsOnPage > 0);
        }

        function init(itemsSize, itemsOnPage) {
            const isValid = validate(itemsSize, itemsOnPage);
            const size = isValid ? itemsSize : 1;
            const limit = isValid ? itemsOnPage : 1;
            const pages = [];
            for (let page = 1; page <= calcPages(size, limit); page++) {
                pages.push({
                    active: page === 1,
                    label: page,
                    begin: (page - 1) * limit
                });
            }
            return pages;
        }

        this.pages = init(itemsSize, itemsOnPage);

        this.activatePage = activated => {
            for (let page of this.pages) {
                page.active = false;
            }
            activated.active = true;
            return activated.begin;
        }
    }
});
