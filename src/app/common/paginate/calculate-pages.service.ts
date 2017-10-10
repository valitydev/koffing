import * as _ from 'lodash';

export class CalculatePagesService {

    public static initPages(itemsSize: number, itemsLimit: number, itemsOffset: number): any[] {
        const size = this.initParam(itemsSize);
        const limit = this.initParam(itemsLimit);
        const offset = this.initParam(itemsOffset);
        const pages: any[] = [];
        for (let page = 1; page <= this.calcPages(size, limit); page++) {
            const calcOffset = (page - 1) * limit;
            pages.push({
                active: calcOffset === offset,
                label: page,
                offset: calcOffset
            });
        }
        return pages;
    }

    private static initParam(param: number): number {
        const result = _.toNumber(param);
        return _.isNaN(result) ? 0 : result;
    }

    private static calcPages(size: number, limit: number): number {
        if (limit === 0 || size < limit) {
            return 0;
        }
        const res = size / limit;
        return (size % limit > 0) ? res + 1 : res;
    }
}
