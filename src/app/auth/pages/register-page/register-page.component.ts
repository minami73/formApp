import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
    templateUrl: './register-page.component.html',
    styles: [
    ]
})
export class RegisterPageComponent {

    constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailValidatorService: EmailValidatorService) { }

    public myForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(this.validatorService.fullNamePattern)]],
        // email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidatorService]],
        email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidatorService]],
        username: ['', [Validators.required, this.validatorService.cantBeStrider]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
    }, {
        //Nivel formulario y no a un campo
        validators: [
            this.validatorService.fieldsMatch('password', 'password2')
        ]
    }
    );

    isValidField(field: string) {
        return this.validatorService.isValidField(this.myForm, field);
    }

    onSubmit(): void {
        this.myForm.markAllAsTouched();
    }
}
