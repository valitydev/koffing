import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { find, chain } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { PayoutTool } from 'koffing/backend';

@Component({
    selector: 'kof-payout-tool-select',
    templateUrl: 'payout-tool-select.component.pug',
    styleUrls: ['payout-tool-select.component.less']
})
export class PayoutToolSelectComponent implements OnChanges {

    @Input()
    public contractID: string;

    @Input()
    public currentPayoutToolID: string;

    @Output()
    public onSelect: EventEmitter<PayoutTool> = new EventEmitter();

    public selectedPayoutToolID: string;
    public payoutTools: PayoutTool[];
    public payoutToolItems: SelectItem[];

    constructor(private payoutToolService: PayoutToolService) { }
    
    public ngOnChanges() {
        this.payoutToolService.getPayoutTools(this.contractID).subscribe((payoutTools: PayoutTool[]) => {
            this.payoutTools = payoutTools;
            const currentPayoutTool = find(this.payoutTools, (payoutTool: PayoutTool) => payoutTool.id === this.currentPayoutToolID);
            this.payoutToolItems = this.getPayoutToolItems(this.payoutTools, currentPayoutTool ? currentPayoutTool.id : '');
            this.select(currentPayoutTool ? currentPayoutTool.id : this.payoutToolItems[0].value);
        });
    }

    public select(payoutToolID: string) {
        this.selectedPayoutToolID = payoutToolID;
        const selectedPayoutTool = find(this.payoutTools, (payoutTool: PayoutTool) => payoutTool.id === payoutToolID);
        this.onSelect.emit(selectedPayoutTool);
    }

    public getPayoutToolItems(payoutTools: PayoutTool[], currentPayoutToolID?: string): SelectItem[] {
        const result = chain(payoutTools)
            .filter((payoutTool: PayoutTool) => payoutTool.id !== 'TEST' && payoutTool.id !== currentPayoutToolID)
            .map((payoutTool: PayoutTool, index) => new SelectItem(payoutTool.id, `Средство вывода ${index + 1}`))
            .value();
        if (currentPayoutToolID) {
            result.unshift(new SelectItem(currentPayoutToolID, 'Текущее средство вывода'));
        }
        return result;
    }
}
