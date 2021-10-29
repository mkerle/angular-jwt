import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  hide = true;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() { return this.form.get('username') };
  get password() { return this.form.get('password') };

  login(): void {
    this.authService.login(this.form.value).subscribe( (result) => {
      if (result) {
        console.log('Login Successful');
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/user']);
      } else {
        console.log('Login Failed');
      }
    }
    );
  }

  logout() : void {
    this.authService.logout();
  }

  constructor(private router : Router, private route : ActivatedRoute, private authService : AuthService, private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
  }

}
