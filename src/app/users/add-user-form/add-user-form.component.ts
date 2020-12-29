import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CustomValidationFormsService } from '../custom-validation-forms.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../user.service';
import { User } from '../user/user';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

    @Output() responseUser = new EventEmitter<User>();

    public hide = true;

    public matcher = new MyErrorStateMatcher();

    public countries: Country[];

    public checked = true;
    public user: User;

    public userForm = new FormGroup(
        {
            firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            emailFormControl: new FormControl(
                '',
                [Validators.required, Validators.email],
                this.customValidator.emailValidator.bind(this.customValidator)
            ),
            phone: new FormControl('', Validators.pattern('[0-9]{9}')),
            countryControl: new FormControl('', Validators.required),
            selectFormControl: new FormControl('', Validators.required),
            password: new FormControl('', Validators.compose([Validators.required, this.customValidator.patternValidator()])),
            confirmPassword: new FormControl({ value: '', disabled: true }, [Validators.required]),
            subscribe: new FormControl(this.checked)
        },
        {
            validators: this.customValidator.matchPassword('password', 'confirmPassword')
        }
    );

    constructor(private customValidator: CustomValidationFormsService,
                public userService: UserService,
                public countryService: CountryService) {}

    ngOnInit(): void {
        this.userForm.get('password').valueChanges.subscribe((value) => {
            if (value) {
                this.userForm.get('confirmPassword').enable();
            } else {
                this.userForm.get('confirmPassword').disable();
            }
        });
        this.countries = this.countryService.countries;
    }

    public onSubmit(): void {
        const user: User = new User(
            this.userForm.get('firstName').value,
            this.userForm.get('lastName').value,
            this.userForm.get('emailFormControl').value,
            this.userForm.get('phone').value,
            this.userForm.get('countryControl').value,
            this.userForm.get('selectFormControl').value,
            this.userForm.get('password').value,
            this.userForm.get('subscribe').value,
            []
        );

        this.userService.addUser(user).subscribe((newUser: User) => {
            this.responseUser.emit(newUser);
            this.userForm.reset();
        });
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
