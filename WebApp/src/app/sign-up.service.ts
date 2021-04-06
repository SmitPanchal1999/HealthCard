import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http:HttpClient) { }


  registerPatient(form)
  {
    var userName = form.patientUid.value;
    var password = form.patientPsw.value;
    var name = form.name.value;
    var cno = form.contactNo.value;
    var dob = form.DOB.value;
    var bloodType = form.bloodType.value;
    var address = form.address.value;
    console.log("service ts",userName, password, name , cno, bloodType, dob,"\n",address);
    this.http.post("http://localhost:8000/registerPatient",{userName, password, name, bloodType, dob, cno, address })
    .subscribe((res:any)=>{
      console.log("response:",res)
    })
  }
}
