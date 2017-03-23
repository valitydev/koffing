import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/components/select/select.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-select-paytool',
    templateUrl: 'select-paytool.component.pug'
})
export class SelectPaytoolComponent implements OnInit {

    public selectableItems: SelectItem[] = [];
    public selectedPayoutToolId: number;
    public isLoading: boolean = true;
    public selectedOption: string;
    @Output()
    public onPayoutToolSelected = new EventEmitter();
    @Input()
    public contractID: number;
    public errorHighlighted: boolean = false;
    private payoutTools: PayoutTool[];
    private selectedPayoutTool: PayoutTool;

    constructor(private contractService: ContractService) { }

    public ngOnInit() {
        this.contractService.getPayoutTools(this.contractID).then((payoutTools) => {
            this.isLoading = false;
            this.payoutTools = payoutTools;
            this.selectableItems = this.prepareSelectableItems(payoutTools);
        });
    }

    public highlightErrors() {
        this.errorHighlighted = true;
    }

    public selectPayoutAccount() {
        this.selectedPayoutTool = this.findSelectedTool(this.payoutTools, this.selectedPayoutToolId);
        this.errorHighlighted = false;
        this.onPayoutToolSelected.emit(_.toNumber(this.selectedPayoutToolId));
    }

    private prepareSelectableItems(payoutTools: PayoutTool[]) {
        return _.map(payoutTools, (payoutTool) => new SelectItem(payoutTool.id, String(payoutTool.id)));
    }

    private findSelectedTool(payoutTools: PayoutTool[], payoutToolID: number) {
        return _.find(payoutTools, (payoutTool) => payoutTool.id === Number(payoutToolID));
    }
}
