import { Component, OnInit } from "@angular/core";

import { RegisterService } from "../register.service";
import { RouterModule, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  basicForm: JSON;

  private id;
  constructor(
    private Toastr: ToastrService,
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngOnInit() {}

  register(form) {
    var password = form.password.value;
    var cpassword = form.cpassword.value;
    var select = form.select.value;
    var fname = form.fname.value;
    var lname = form.lname.value;
    var email = form.email.value;
    var user = select;
    var blood = form.bloodType.value;
    var dob = form.DOB.value;
    var contact = form.contact.value;
    var address = form.address.value;
    if (
      password &&
      fname &&
      lname &&
      email &&
      user &&
      blood &&
      dob &&
      contact &&
      address
    ) {
      if (select == "1") {
        this.Toastr.warning("Select How Do You Want To Sign Up");
      } else if (password != cpassword) {
        this.Toastr.error("Password and confirmm Password are not matched");
      } else if (select == "patient") {
        this.registerService
          .getUserId(fname, lname, dob, user)
          .subscribe((response) => {
            this.id = response.userId;
            this.registerService
              .registerUser(
                fname,
                lname,
                password,
                address,
                contact,
                dob,
                blood,
                email,
                user,
                response.userId
              )
              .subscribe((res) => {
                console.log("resg status:", res);
                if (res.success) this.router.navigate(["/Login"]);
                else this.Toastr.error("Registration Failed");
              });
          });
      } else {
        this.router.navigate(["/Signup2"], {
          state: {
            fname: form.fname.value,
            lname: form.lname.value,
            password: password,
            email: form.email.value,
            user: select,
            blood: form.bloodType.value,
            dob: form.DOB.value,
            contact: form.contact.value,
            address: form.address.value,
          },
        });
      }
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
}
