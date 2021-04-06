import { Subject } from "rxjs";
import { RegisterService } from "src/app/register.service";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ViewPrescriptionService {
  private userSubject = new Subject<any>();
  private detailedSub = new Subject<any>();
  private wholeUserSubject = new Subject<any>();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private register: RegisterService
  ) {}

  getDetailedSub() {
    return this.detailedSub.asObservable();
  }

  getWholeUserObject() {
    return this.wholeUserSubject.asObservable();
  }

  getUserSubject() {
    return this.userSubject.asObservable();
  }
  getPrescription(id: string) {
    this.http
      .get(this.register.doctocUrl + "/getPrescriptions/" + id)
      .subscribe((res: any) => {
        console.log("FROM VIEWPRES FROM DOC", res);
        if (res.ok) {
          console.log(res.docs);
          this.userSubject.next(res.docs);
        } else {
          this.toastr.error("Patients have no prescriptions yet");
        }
      });
  }

  getDocsUsersPrescriptions(docId: string) {
    this.http
      .get(this.register.doctocUrl + "/getDocPatientPrescriptions/" + docId)
      .subscribe((res: any) => {
        if (res.ok) {
          console.log(res.docs, "RESPONSEE");
        }
      });
  }
}
