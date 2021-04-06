import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import * as CryptoJs from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  public UserUrl = "http://localhost:8000/api/user";
  public doctocUrl = "http://localhost:8000/api/doctor";
  public LoginUrl = "http://localhost:8000/api/login";
  public specialityUrl = "http://localhost:8000/api/speciality";
  public registerUrl = "http://localhost:8000/api/register";
  public labUrl = "http://localhost:8000/api/lab";

  public isLogged = new BehaviorSubject<boolean>(false);
  public isLoggedCast = this.isLogged.asObservable();

  public userT = new BehaviorSubject<any>(null);
  public userTypeCast = this.userT.asObservable();

  public userData = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  private listusers = new Subject<any>();
  public alluser: any;
  changeelectroProductt(search: any) {
    //  console.log('auth changep')
    this.listusers.next(search);
  }
  getelectroproductlistt() {
    return this.alluser;
  }

  cast9Listener() {
    return this.listusers.asObservable();
  }

  getuser() {
    this.http.get(this.UserUrl + "/getusers/").subscribe((response: any) => {
      this.alluser = JSON.stringify(response.alluser);
      this.listusers.next(this.alluser);
      console.log("Users:", this.alluser);
    });
  }

  register(
    password,
    fname,
    lname,
    email,
    blood,
    dob,
    contact,
    address,
    user,
    licence,
    labname,
    DOE,
    lab_address,
    selectedItems
  ) {
    //console.log("in registershop");
    this.http
      .get(
        this.UserUrl +
          "/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post(this.registerUrl + "/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId,
          })
          .subscribe((response: any) => {
            if (user == "lab") {
              this.http
                .post(this.registerUrl + "/register", {
                  userId,
                  password,
                  fname,
                  lname,
                  email,
                  blood,
                  dob,
                  contact,
                  address,
                  user,
                  licence,
                  labname,
                  DOE,
                  lab_address,
                  selectedItems,
                })
                .subscribe((response: any) => {
                  if (response.success) {
                    console.log("Inserted Successfully");
                    this.Toastr.success("Registration of  Lab successfull!!");
                  }
                });
            }
          });
      });
  }
  uploadreport(fd, selected) {
    console.log("selected item", selected);

    this.http
      .post(this.labUrl + "/upload/" + selected.name, { fd })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Report Uploaded!!");
        }
      });
  }

  getUserId(fname, lname, dob, user): Observable<any> {
    console.log("userId");
    return this.http.get(
      this.UserUrl +
        "/getUserId/" +
        fname +
        "/" +
        lname +
        "/" +
        user +
        "/" +
        dob
    );
  }

  private specList = new Subject();

  getSpecList() {
    return this.specList.asObservable();
  }

  registermedic(
    password,
    fname,
    lname,
    email,
    blood,
    dob,
    contact,
    address,
    user,
    licence,
    shopname,
    DOE,
    shop_address
  ) {
    this.http
      .get(
        this.UserUrl +
          "/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post(this.registerUrl + "/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId,
          })
          .subscribe((response: any) => {
            this.http
              .post(this.registerUrl + "/registermedic", {
                userId,
                password,
                fname,
                lname,
                email,
                blood,
                dob,
                contact,
                address,
                user,
                licence,
                shopname,
                DOE,
                shop_address,
              })
              .subscribe((response: any) => {
                if (response.success) {
                  console.log("Inserted Successfully");
                  this.Toastr.success(
                    "Registration of medical shop successfull!!"
                  );
                }
              });
          });
      });
  }

  registeDoc(
    fname,
    lname,
    password,
    address,
    contact,
    dob,
    blood,
    email,
    user,
    licence,
    degree,
    specialities,
    work_place,
    work_place_con,
    work_place_add
  ) {
    console.log("Inside Doc registration");
    this.http
      .get(
        this.UserUrl +
          "/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post(this.registerUrl + "/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId,
          })
          .subscribe((response: any) => {
            if (response.success) {
              console.log("Inserted Successfully Doc as user");
              this.http
                .post(this.doctocUrl + "/doctorExtraDetail", {
                  userId,
                  licence,
                  degree,
                  specialities,
                  work_place,
                  work_place_con,
                  work_place_add,
                })
                .subscribe((res: any) => {
                  if (res.success) {
                    this.Toastr.success("Registration of Doctor successfull!!");
                  } else {
                    this.Toastr.error("Doc Registration Failed", "Failed");
                  }
                });
            } else {
              console.log("Registration Error in doc user");
              this.Toastr.error("Registration Failed", "Failed");
            }
          });
      });
  }

  registerUser(
    fname,
    lname,
    password,
    address,
    contact,
    dob,
    blood,
    email,
    user,
    userId
  ): Observable<any> {
    console.log("regiserUser");
    return this.http.post(this.registerUrl + "/registeruser", {
      fname,
      lname,
      password,
      address,
      contact,
      dob,
      blood,
      email,
      user,
      userId,
    });
  }

  login(uname, password) {
    this.http
      .post(this.LoginUrl + "/login", { uname, password })
      .subscribe((response: any) => {
        if (response.success) {
          this.isLogged.next(true);

          console.log(response);
          this.userData.next(response.userData);
          this.userT.next(response.userType);

          var encuerType = CryptoJs.AES.encrypt(response.userType, "Hello!");
          var bytes = CryptoJs.AES.decrypt(encuerType, "Hello!");
          var pt = bytes.toString(CryptoJs.enc.Utf8);
          console.log("Ct:", encuerType, " pt:", pt);
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("type", encuerType);
          sessionStorage.setItem("uid", response.userId);

          this.Toastr.success("Login Successful");

          if (response.userType.toLowerCase() == "patient")
            this.router.navigate(["/Patient/Home"]);
          else if (response.userType.toLowerCase() == "doctor")
            this.router.navigate(["/Diagnose"]);
          else if (response.userType.toLowerCase() == "lab")
            this.router.navigate(["/lab/labhome"]);
          else if (response.userType.toLowerCase() == "medical")
            this.router.navigate(["/Patient/Home"]);
        } else {
          this.Toastr.error("Login Failed");
        }
      });
  }

  logout() {
    this.isLogged.next(false);
    this.userT.next("");
    sessionStorage.removeItem("isLogged");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("type");
    this.Toastr.success("Logged Out");
    this.router.navigate(["/Login"]);
  }

  // getOtpSub() {
  //   return this.otpSub.asObservable();
  // }

  // verifyOtp(otp: string, email: string) {
  //   this.http
  //     .post(this.registerUrl + "/verifyOtp", { otp, email })
  //     .subscribe((res: any) => {
  //       console.log("RES FROM VERIFY OTP ", res);
  //       if (res.ok) {
  //         this.otpSub.next(res.otp);
  //       }
  //       if (!res.ok) {
  //         this.Toastr.error("Wrong OTP", "Verification Failed");
  //         console.log("wrong OTP");
  //       }
  //     });
  // }
}
