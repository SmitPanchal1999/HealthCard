import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { RegisterService } from "src/app/register.service";

@Component({
  selector: "app-view-profile-patient",
  templateUrl: "./view-profile-patient.component.html",
  styleUrls: ["./view-profile-patient.component.css"],
})
export class ViewProfilePatientComponent implements OnInit {
  public userData: JSON;
  constructor(
    private http: HttpClient,
    private router: Router,
    private register: RegisterService
  ) {}

  ngOnInit() {
    console.log(sessionStorage.getItem("uid"));
    this.http
      .get(
        this.register.registerUrl +
          "/commonUserData/" +
          sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        console.log("RESponse" + JSON.stringify(res));
        this.userData = res.userData;
      });
  }
}
