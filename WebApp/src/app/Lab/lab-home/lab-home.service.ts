import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LabHomeService {
  private UserUrl = "http://localhost:8000/api/user";
  private doctocUrl = "http://localhost:8000/api/doctor";
  private LoginUrl = "http://localhost:8000/api/login";  
  private specialityUrl = "http://localhost:8000/api/speciality";
  private registerUrl = "http://localhost:8000/api/register";
  private labUrl = "http://localhost:8000/api/lab";
  private diagSubject = new Subject<any>();
  private uploadedSubject = new Subject<any>();
  
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getDiagSubject() {
    return this.diagSubject.asObservable();
  }

  getLabDiagnoses() {
    
    this.http.get(this.labUrl+"/getDiagnoses").subscribe((res:any) => {
      console.log('RES FROM LAB DIAGS', res)
      this.diagSubject.next(res.docs);
    })
  }

  getuploadedSubject() {
    return this.uploadedSubject.asObservable();
  }

  getLabuploaded() {
    
    this.http.get(this.labUrl+"/uploadedreport").subscribe((res:any) => {
      console.log('RES FROM LAB DIAGS', res)
      this.uploadedSubject.next(res.docs);
    })
  }
}
