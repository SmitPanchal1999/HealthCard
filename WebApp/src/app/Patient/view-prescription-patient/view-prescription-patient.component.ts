import { Component, OnInit, Inject } from "@angular/core";
import { RegisterService } from "src/app/register.service";
import { HttpClient } from "@angular/common/http";
import { Subscription, Subject, BehaviorSubject } from "rxjs";

import * as FileSaver from "file-saver";
@Component({
  selector: "app-view-prescription-patient",
  templateUrl: "./view-prescription-patient.component.html",
  styleUrls: ["./view-prescription-patient.component.css"],
})
export class ViewPrescriptionPatientComponent implements OnInit {
  public showDetails = false;
  public pres = new BehaviorSubject<any>("");
  public presList;
  public prescData;
  public reports;isReport;
  public list = new BehaviorSubject<any>("");
  public arr;
  public obj: any;
  public listofpre: Subscription;
  public responsedData: any;
  private userId;
  constructor(
    private registerService: RegisterService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem("uid");
    //  console.log('INSIDeeee',this.userId)
    this.list.asObservable().subscribe((d) => (this.arr = d));
    this.pres.asObservable().subscribe((d) => (this.presList = d));

    this.getPrescriptionList();
  }

  getPrescriptionList() {
    this.http
      .get(this.registerService.UserUrl + "/getDiagnosisList/" + this.userId)
      .subscribe((res: any) => {
        console.log("aaray", res);
        this.list.next(res.dList);

        console.log("arr", this.arr);
      });
  }

  getDetails(pId, reportIds) {
    this.http
      .get(
        this.registerService.UserUrl + "/getDetails/" + pId + "/" + reportIds
      )
      .subscribe((res: any) => {
        console.log("details", res);
        this.pres.next(res.presc);
        this.prescData = res.presc;
        if(res.reports[0].report)
        {
          this.reports = res.reports[0].report;
          this.isReport=true;
        }else{
          this.isReport=false;
          this.reports = res.reports;
        }
        this.showDetails = true;
      });
  }
  downloadReport(){
    this.http
    .get(
      this.registerService.labUrl + "/download/" + this.reports,{responseType:'blob'}
    )
    .subscribe((res: any)=>{
      console.log(res)
      if(res){
        FileSaver.saveAs(new Blob([res],{type:'application/pdf'}),this.reports);
      }
    })
    
  }
}
