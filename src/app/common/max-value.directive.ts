import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[kofMax][formControlName],[kofMax][formControl],[kofMax][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MaxValueValidatorDirective,
            multi: true
        }
    ]
})
export class MaxValueValidatorDirective implements Validator, OnChanges {
    @Input()
    public kofMax: string;

    private validator: ValidatorFn;

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['kofMax']) {
            this.createValidator();
        }
    }

    public validate(c: AbstractControl): { [key: string]: any } {
        return this.validator(c);
    }

    private createValidator() {
        this.validator = this.prepareValidatorFn(parseInt(this.kofMax, 10));
    }

    private prepareValidatorFn(mx: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const v = +control.value;
            return v > mx ? { max: { maxValue: mx, actualValue: v } } : null;
        };
    }
}
