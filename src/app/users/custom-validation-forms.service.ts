import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomValidationFormsService {
    constructor() {}

    // для проверки шаблона пароля
    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            return valid ? null : { invalidPassword: true };
        };
    }

    // сравнения паролей
    matchPassword(password: string, confirmPassword: string): any {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        };
    }

    emailValidator(emailControl: AbstractControl): unknown {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.validateEmail(emailControl.value)) {
                    resolve({ emailNotAvailable: true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    validateEmail(emailFormControl: string): boolean {
        const EmailList = ['asd@asd.com', 'admin@admin.com', 'user@user.com', 'superuser@superuser.ua'];
        return EmailList.indexOf(emailFormControl) > -1;
    }
}
