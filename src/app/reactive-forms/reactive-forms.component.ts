import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidationService } from './custom-validation.service';

@Component({
    selector: 'app-reactive-forms',
    templateUrl: './reactive-forms.component.html',
    styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
    hide = true;

    matcher = new MyErrorStateMatcher();

    countries: Country[] = [
        { name: 'USA', flag: 'us.svg' },
        { name: 'Germany', flag: 'de.svg' },
        { name: 'Italy', flag: 'it.svg' },
        { name: 'France', flag: 'fr.svg' },
        { name: 'Scotland', flag: 'gb-sct.svg' },
        { name: 'Spain', flag: 'es.svg' },
        { name: 'Hungary', flag: 'hu.svg' },
        { name: 'Australia', flag: 'au.svg' },
        { name: 'Brazil', flag: 'br.svg' },
        { name: 'Canada', flag: 'ca.svg' }
    ];

    user = {
        firstName: 'Sergey',
        lastName: 'Babich',
        emailFormControl: 'sergey@qwe.com',
        phone: '976665544',
        countryControl: this.countries[7],
        selectFormControl: 'male',
        password: '123456Qw',
        subscribe: false
    };

    checked = false;
    changeValue: any = [];
    val: any = [];

    reactiveForm = new FormGroup(
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
            subscribe: new FormControl('')
        },
        {
            validators: this.customValidator.matchPassword('password', 'confirmPassword')
        }
    );

    constructor(private customValidator: CustomValidationService) {}

    ngOnInit(): void {
        this.reactiveForm.get('password').valueChanges.subscribe((value) => {
            if (value) {
                this.reactiveForm.get('confirmPassword').enable();
            } else {
                this.reactiveForm.get('confirmPassword').disable();
            }
        });

        this.reactiveForm.patchValue(this.user);

        // this.reactiveForm.get('firstName').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('firstName: ' + this.reactiveForm.get('firstName').value);
        //   }
        // });
        //
        // this.reactiveForm.get('lastName').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('lastName: ' + this.reactiveForm.get('lastName').value);
        //   }
        // });
        //
        // this.reactiveForm.get('emailFormControl').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('email: ' + this.reactiveForm.get('emailFormControl').value);
        //   }
        // });
        //
        // this.reactiveForm.get('phone').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('phone: ' + this.reactiveForm.get('phone').value);
        //   }
        // });
        //
        // this.reactiveForm.get('countryControl').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('country: ' + this.reactiveForm.get('countryControl').value.name);
        //   }
        // });
        //
        // this.reactiveForm.get('selectFormControl').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('gender: ' + this.reactiveForm.get('selectFormControl').value);
        //   }
        // });
        //
        // this.reactiveForm.get('password').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('password: ' + this.reactiveForm.get('password').value);
        //   }
        // });
        //
        // this.reactiveForm.get('subscribe').valueChanges.subscribe((value) => {
        //   if (value) {
        //     this.changeValue = ('subscribe: ' + this.reactiveForm.get('subscribe').value);
        //   }
        // });

        // for (const key of Object.keys(this.user)) {
        //   console.log(key + ': ' + this.user[key]);
        //   this.reactiveForm.get(key).valueChanges.subscribe((value) => {
        //     if (value) {
        //       this.changeValue += (key + ': ' + this.reactiveForm.get(key).value);
        //     }
        //   });
        // }

        // for (const key of Object.keys(this.reactiveForm.value)) {
        //   console.log(key + ': ' + this.reactiveForm.value[key]);
        //
        //   this.reactiveForm.get(key).valueChanges.subscribe((value) => {
        //     if (value) {
        //       this.changeValue = key + ': ' + this.reactiveForm.get(key).value;
        //     }
        //   });
        // }
    }

    onChange(): void {
        for (const key of Object.keys(this.reactiveForm.value)) {
            // console.log(key + ': ' + this.reactiveForm.value[key]);

            this.reactiveForm.get(key).valueChanges.subscribe((value) => {
                if (value) {
                    this.changeValue = key + ': ' + this.reactiveForm.get(key).value;
                }
            });
        }
        this.changeValue += this.changeValue;
    }

    onSubmit(): void {
        console.log(this.onChange());
        // console.log(
        //   this.changeValue
        //   // [
        //   //   {firstName: this.reactiveForm.get('firstName').value},
        //   //   {lastName: this.reactiveForm.get('lastName').value},
        //   //   {email: this.reactiveForm.get('emailFormControl').value},
        //   //   {phone: this.reactiveForm.get('phone').value},
        //   //   {country: this.reactiveForm.get('countryControl').value.name},
        //   //   {gender: this.reactiveForm.get('selectFormControl').value},
        //   //   {password: this.reactiveForm.get('password').value},
        //   //   {subscribe: this.reactiveForm.get('subscribe').value},
        //   // ],
        // );
    }
}

interface Country {
    name: string;
    flag: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
