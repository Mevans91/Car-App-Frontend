import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { LocalStorageService } from '../_services/local-storage.service';
import { UserService } from '../_services/user.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  private subs = new Subscription()

  constructor(
    private fb: FormBuilder,
    private storageService: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
    this.retrieveMyEmailFromStorage()
  }

   retrieveMyEmailFromStorage() {
     const myEmail = this.storageService.getItem('myEmail')
     console.log('myEmail = ', myEmail)
   }

  createFormControls() {
    this.formValues = {
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    }
  }

  createForm() {
    this.form = this.fb.group(this.formValues, { validator: MustMatch('password', 'passwordConfirmation') })
  }

  // convenience getter for form controls
  get f() {
    if (this.form && this.form.controls) {
      return this.form.controls
    }
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
    }
    const form = this.form.value
    const params = {
      first_name: form.firstName,
      last_name: form.lastName,
      username: form.userName,
      location: form.location,
      email: form.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation
    }
    this.subs.add(
      this.userService.signup(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        }
      }, error => {
        if (error) {
          console.log(error)
          this.submitting = false
          this.errorMsg = 'User already exists in this system! Please Login'
        }
      })
    )
  }

  cancelForm() {
    this.form.reset
  }


  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
