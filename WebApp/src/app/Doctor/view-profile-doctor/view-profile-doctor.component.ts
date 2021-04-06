import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterService } from "src/app/register.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-profile-doctor",
  templateUrl: "./view-profile-doctor.component.html",
  styleUrls: ["./view-profile-doctor.component.css"],
})
export class ViewProfileDoctorComponent implements OnInit {
  public userData: JSON;
  public doc: JSON;
  constructor(
    private http: HttpClient,
    private router: Router,
    private register: RegisterService
  ) {}

  ngOnInit() {
    this.http
      .get(
        this.register.registerUrl +
          "/commonUserData/" +
          sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        this.userData = res.userData;
      });
    this.http
      .get(
        this.register.registerUrl + "/docData/" + sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        this.doc = res.docData;
      });
  }
}
