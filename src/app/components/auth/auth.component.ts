import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserData } from '../../models/user.data';
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
  private notif:NotificationService) { }

  type:string;
  signupForm:FormGroup;
  loginForm:FormGroup;
  fetching:boolean = false;

  ngOnInit(): void {
    this.determineAuth();
  }

  determineAuth(): void {
    this.type = this.rte.snapshot.paramMap.get('type');

    if(this.type == 'signup' || this.type == 'login') {
        this.createSignupForm();
        this.createLoginForm();
        return;
    }

    this.router.navigate(['/error/404']);
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

  }
}
