import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  publicKey : string = '';

  getPublicKey() {
    return this.authService.jwtPublicKey().subscribe( (result) => {
      this.publicKey = result.toString('ascii');
    });  
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
