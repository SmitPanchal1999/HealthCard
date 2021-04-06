import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadreportService {
  private listusers = new Subject<any>();
  public alluser: any;

  constructor(private http: HttpClient, private Toastr: ToastrService) { }
  
  uploadreport(fd, selected) {
    console.log("selected item", selected);

    this.http
      .post("http://localhost:8000/api/lab/upload/" + selected.name, { fd })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Report Uploaded!!");
        }
      });
  }
  cast9Listener() {
    return this.listusers.asObservable();
  }
  private userUrl = "http://localhost:8000/api/user/";
  private registerUrl = "http://localhost:8000/api/register/";
  private specialityUrl = "http://localhost:8000/api/speciality/";
  private labUrl = "http://localhost:8000/api/lab/"
  getuser() {
    this.http
      .get("http://localhost:8000/api/user/getusers/")
      .subscribe((response: any) => {
        this.alluser = JSON.stringify(response.alluser);
        this.listusers.next(this.alluser);
       // console.log("Users:", this.alluser);
      });
  }
}
