import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { httpInterceptorProviders } from './interceptors/index';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { NoAccessComponent } from './no-access/no-access.component';
import { AppAuthGuard } from './app-auth-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName : 'csrftoken', headerName : 'X-CSRFTOKEN' }),
    RouterModule.forRoot([
      { path : '', component : AuthComponent },
      { path : 'user', component : UserComponent, canActivate : [AuthGuard, AppAuthGuard] },
      { path : 'no-access', component : NoAccessComponent },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: (request) => { 
          if (request!.url.includes("localhost")) { 
            return sessionStorage.getItem('token'); 
          } else { 
            return null; 
          } 
        },
        allowedDomains: ["localhost:9000"],
        disallowedRoutes: [],
      },
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [httpInterceptorProviders, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
