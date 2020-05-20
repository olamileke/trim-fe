import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router, private rte:ActivatedRoute, private fb:FormBuilder) { }
  type:string;
  signupForm:FormGroup;
  loginForm:FormGroup;

  ngOnInit(): void {
    this.determineAuth();
  }

  ngOnChanges() : void {
    this.determineAuth();
  }

  determineAuth(): void {
    this.type = this.rte.snapshot.paramMap.get('type');

    if(this.type == 'signup') {
        this.createSignupForm();
        return;
    }

    if(this.type == 'login') {
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

}
