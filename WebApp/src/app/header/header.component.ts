import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogged
  public userType
  constructor(private registerService:RegisterService) { 
    this.registerService.isLoggedCast.subscribe(stat=> this.isLogged=stat)
    this.registerService.userTypeCast.subscribe(info => this.userType=info)
  }
  
  ngOnInit() {
  }
  logout()
  {
    this.registerService.logout()
  }
}
