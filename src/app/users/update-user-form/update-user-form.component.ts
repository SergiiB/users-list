import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CustomValidationFormsService } from '../custom-validation-forms.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../user/user';
import { Country } from '../country';
import { CountryService } from '../country.service';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit {

    private user: User;

    public countries: Country[];

    public matcher = new MyErrorStateMatcher();

    public checked = true;

    public updateUserForm = new FormGroup(
        {
            firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl(
                '',
                [Validators.required, Validators.email],
                this.customValidator.emailValidator.bind(this.customValidator)
            ),
            phone: new FormControl('', Validators.pattern('[0-9]{9}')),
            country: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            subscribe: new FormControl(this.checked)
        }
    );

    constructor(private customValidator: CustomValidationFormsService, public userService: UserService,
                public countryService: CountryService, public route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.userService.getUserById(id)
            .subscribe(user => {
                this.user = user;
                this.updateUserForm.patchValue(this.user);
            });

        this.countries = this.countryService.countries;
    }

    save(): void {
        if (this.updateUserForm.valid) {
            const newUser = new User(
                this.updateUserForm.get('firstName').value,
                this.updateUserForm.get('lastName').value,
                this.updateUserForm.get('email').value,
                this.updateUserForm.get('phone').value,
                this.updateUserForm.get('country').value,
                this.updateUserForm.get('gender').value,
                this.user.password,
                this.updateUserForm.get('subscribe').value,
                this.user.tasks,
                this.user.id
            );

            this.userService.updateUser(newUser)
                .subscribe(editUser =>  {
                    this.user = editUser;
                    this.router.navigate(['/users']);
                });
        } else {
            return;
        }
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
