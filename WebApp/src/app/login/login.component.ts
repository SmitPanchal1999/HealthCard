import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private registeService: RegisterService,
    private Toastr: ToastrService
  ) {}

  ngOnInit() {}
  login(uname, password) {
    if (uname.value && password.value) {
      console.log(uname.value, password.value);
      this.registeService.login(uname.value, password.value);
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
}
