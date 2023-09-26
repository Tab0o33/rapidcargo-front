import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notEqualValidator(unexpectedText: string): ValidatorFn {
    return (control: AbstractControl): null | ValidationErrors => {
        return control.value === unexpectedText ? { notEqualValidator: control.value } : null;
    };
}