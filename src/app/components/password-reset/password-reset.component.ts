import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private rte:ActivatedRoute,
  private user:UserService, private auth:AuthService, private notif:NotificationService) { }

  resetForm:FormGroup;
  user_id:number;
  token:string;

  ngOnInit(): void {
    this.token = this.rte.snapshot.paramMap.get('token');
    this.determineToken(this.token);
    this.createForm();
  }

  determineToken(token:string): void {
    const data = {'token':token}
    this.auth.verifyResetToken(data).subscribe((res:any) => { })
  }

  createForm(): void {
    this.resetForm = this.fb.group({
        password:['', [Validators.minLength(8)]]
    });
  }

  submit(form:FormGroup): void {
    const data = form.value;
    data['token'] = this.token;
    this.user.changePassword(form.value).subscribe((res:any) => {
        this.notif.success('Password changed successfully');
        this.router.navigate(['/auth/login']);
    })
  }

  get password(): any {
    return this.resetForm.get('password');
  }

}
