import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AddPrescriptionService {
  private listusers = new Subject<any>();
  public alluser: any;

  constructor(private http: HttpClient, private Toastr: ToastrService) {}
  cast9Listener() {
    return this.listusers.asObservable();
  }
  getuser() {
    this.http
      .get("http://localhost:8000/api/user/getusers/")
      .subscribe((response: any) => {
        this.alluser = JSON.stringify(response.alluser);
        this.listusers.next(this.alluser);
        console.log("Users:", this.alluser);
      });
    }
  newPrescription(formData: any, medicines: any[]) {
    console.log("Inside newPrescription");
    console.log("At service:" + JSON.stringify(formData));
    var dId = sessionStorage.getItem("dId")
    console.log(dId)
    this.http
      .post("http://localhost:8000/api/doctor/addPrescription", {
        formData,
        medicines,
        dId
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.Toastr.success("Prescription added successfull!!");
        } else {
          this.Toastr.error("New Prescription entry Failed");
        }
      });
    console.log("Exiting newPrescription");
  }

  // getHospital() {
  //   this.http
  //     .get("http://localhost:8000/api/user/gethospital/")
  //     .subscribe((response: any) => {
  //       this.alluser = JSON.stringify(response.alluser);
  //       this.listusers.next(this.alluser);
  //       console.log("Users:", this.alluser);
  //     });
  //   }
}
