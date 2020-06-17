import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserData } from '../../models/user.data';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router, private rte:ActivatedRoute,
  private fb:FormBuilder, private user_service:UserService,
  private notif:NotificationService, private auth:AuthService) { }

  type:string;
  token:string;
  signupForm:FormGroup;
  loginForm:FormGroup;
  fetching:boolean = false;

  ngOnInit(): void {
    this.determineAuth();
  }

  determineAuth(): void {
    this.type = this.rte.snapshot.paramMap.get('type');
    this.token = this.rte.snapshot.paramMap.get('token');

    if(this.token) {
        this.type = 'login';
        this.activateAccount(this.token);
    }

    if(this.type == 'signup' || this.type == 'login') {
        this.createSignupForm();
        this.createLoginForm();
        return;
    }

    this.router.navigate(['/error/404'])
  }

  activateAccount(token:string): void {
    const data = {'token':token};

    this.user_service.activate(data).subscribe((res:UserData) => {
        this.notif.success('Signup completed!');
    })
  }

  createSignupForm(): void {
    this.signupForm = this.fb.group({
        name:['', [Validators.required, Validators.minLength(7)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleForm(type:string): void {
    this.type = type;
  }

  signup(form:FormGroup): void {
    this.fetching = true;

    this.user_service.signup(form.value).subscribe((res:UserData) => {
        this.fetching = false;
        this.notif.success('Signup successful. Check your email');
    })
  }

  login(form:FormGroup): void {

    this.auth.login(form.value).subscribe((res:any) => {
        localStorage.setItem('trim_token', res.data.token);
        localStorage.setItem('trim_user', JSON.stringify(res.data.user));
        this.router.navigate(['/dashboard']);
        this.notif.success('Logged in successfully');
    })
  }

  forgotPassword(): void {
    if(this.loginEmail.invalid) {
        this.notif.error('Enter a valid email');
        return;
    }

    const data = {'email':this.loginEmail.value};

    this.auth.verifyEmail(data).subscribe((res:any) => {
        this.notif.success('Complete the process at your email');
    })
  }

  get signupName() {
    return this.signupForm.get('name');
  }

  get signupEmail() {
    return this.signupForm.get('email');
  }

  get signupPassword() {
    return this.signupForm.get('password');
  }

  get loginEmail() {
    return this.loginForm.get('email');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }
}
