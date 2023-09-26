import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isGreaterThanValidator(totalName: string, unitName: string): ValidatorFn {
    return (control: AbstractControl): null | ValidationErrors => {
        if (!control.get(totalName) || !control.get(unitName)) {
            return {
                isGreaterThanValidator: 'Invalid control names'
            };
        }
        const unitValue: number = control.get(unitName)!.value;
        const totalValue: number = control.get(totalName)!.value;
        if (totalValue < unitValue) {
            return {
                isGreaterThanValidator: {
                    unit: unitValue,
                    total: totalValue
                }
            };
        } else {
            return null;
        }
    };
}
