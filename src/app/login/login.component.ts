import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  loginFormValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createFormControls(),
    this.createForm()
  }

  createFormControls() {
    this.loginFormValues = {
      username: ['', Validators.required],
      password: ['', Validators.required]
    }
  }

  createForm() {
    this.loginForm = this.fb.group(this.loginFormValues)
  }

  submitForm() {
    this.hasError = false
    this.submitting= true
    this.errorMsg = null
    if (this.loginForm.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const form = this.loginForm.value
    const params = { username: form.username, password: form.password }
    this.subs.add(
      this.userService.login(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        }
      }, error => {
        if (error) {
          console.log(error)
          this.submitting = false
          this.hasError = true
          this.errorMsg = 'Email and Password combination do not exist in this system!'
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
