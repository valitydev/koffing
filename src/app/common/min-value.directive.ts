import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[kofMin][formControlName],[kofMin][formControl],[kofMin][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MinValueValidatorDirective,
            multi: true
        }
    ]
})
export class MinValueValidatorDirective implements Validator, OnChanges {
    @Input()
    public kofMin: string;

    private validator: ValidatorFn;

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['kofMin']) {
            this.createValidator();
        }
    }

    public validate(c: AbstractControl): { [key: string]: any } {
        return this.validator(c);
    }

    private createValidator() {
        this.validator = this.prepareValidatorFn(parseInt(this.kofMin, 10));
    }

    private prepareValidatorFn(mn: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const v = +control.value;
            return v < mn ? { min: { minValue: mn, actualValue: v } } : null;
        };
    }
}
