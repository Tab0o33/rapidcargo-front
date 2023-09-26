import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function referenceValidator(refTypeName: string, refValueName: string): ValidatorFn {
    return (control: AbstractControl): null | ValidationErrors => {
        if (!control.get(refTypeName) || !control.get(refValueName)) {
            return {
                referenceValidator: 'Invalid control names'
            };
        }
        const refType: string = control.get(refTypeName)!.value;
        const refValue: number = control.get(refValueName)!.value;
        if (refType === "AWB" && refValue && refValue.toString().length != 11) {
            return {
                referenceValidator: { refType, refValue }
            };
        } else {
            return null;
        }
    };
}