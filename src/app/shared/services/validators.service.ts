import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {

    public fullNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{2,4}$";

    public cantBeStrider = (control: FormControl): ValidationErrors | null => {

        const value: string = control.value.trim().toLowerCase();

        if (value === 'strider') {
            return {
                noStrider: true,
            }
        }

        return null;
    }

    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched
    }

    public fieldsMatch(field1: string, field2: string) {

        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ noEqual:true})
                return { notEqual: true }
            }

            formGroup.get(field2)?.setErrors(null);
            return null;
        }
    }

}
