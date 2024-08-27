import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  load: boolean = false;
  ngOnInit(): void {}
  constructor(
    private login: AuthenticationService,
    private messageService: MessageService,
    private route: Router // private app: HeaderComponent // private app: AppComponent
  ) {
    this.userregister = new FormGroup({
      username: new FormControl('admin', [Validators.required]),
      password: new FormControl('Password1', [Validators.required]),
    });
  }

  getusername() {
    return this.userregister.get('username');
  }
  userregister!: FormGroup;

  submit(value: FormGroup) {
    this.load = true;
    this.login
      .login(value.get('username')?.value, value.get('password')?.value)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'loggedin',
            });
            this.load = false;
            setTimeout(() => {
              this.route.navigateByUrl('Home');
            }, 2000);
          }
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: 'you have not entered the right details',
          });
          console.log(err);
        },
      });
  }
}
