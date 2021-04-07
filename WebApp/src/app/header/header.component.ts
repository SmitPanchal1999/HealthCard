import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

import * as CryptoJs from "crypto-js";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogged;
  public userType;

  constructor(private registerService:RegisterService) { 
   this.isLogged= sessionStorage.getItem("isLogged");
    
    if (sessionStorage.getItem("type")!==null){
      this.userType = CryptoJs.AES.decrypt(sessionStorage.getItem("type"),"Hello!").toString(CryptoJs.enc.Utf8);
      this.userType.toLowerCase();
   
    }
    else {
      this.userType="heelllo";
    }
     }
  
  ngOnInit() {
  }
  logout()
  {
    this.registerService.logout()
  }
}
