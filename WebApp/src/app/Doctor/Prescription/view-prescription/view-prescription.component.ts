import { Router } from "@angular/router";

import { UploadreportService } from "./../../../Lab/uploadreport/uploadreport.service";
import { ViewPrescriptionService } from "./../view-prescription.service";
import { Component, OnInit } from "@angular/core";
import { Subscription, BehaviorSubject } from "rxjs";
import { NgForm } from "@angular/forms";
import { RegisterService } from "src/app/register.service";
import { HttpClient } from "@angular/common/http";
import * as FileSaver from "file-saver";
@Component({
  selector: "app-view-prescription",
  templateUrl: "./view-prescription.component.html",
  styleUrls: ["./view-prescription.component.css"],
})
export class ViewPrescriptionComponent implements OnInit {
  public showDetails = false;
  public pres = new BehaviorSubject<any>("");
  public presList;
  public prescData;
  public reports;
  isReport;
  public list = new BehaviorSubject<any>("");
  public arr: Array<JSON>;
  public obj: any;
  public listofpre: Subscription;
  public responsedData: any;
  private userId;
  public _preFlag = false;
  public images = [];
  public user;
  private alluser: Subscription;
  private _flag = false;
  public users: any;
  temp = [];
  public selected: any;
  keyword = "name";
  private dataSubscription: Subscription;
  private responsedData1: any;
  constructor(
    private registerService: RegisterService,
    private viewPrescriptionService: ViewPrescriptionService,
    private _uploadReportService: UploadreportService,
    private http: HttpClient,
    private router: Router
  ) {}
  private wholeSubscription: Subscription;
  ngOnInit() {
    this.list.asObservable().subscribe((d) => (this.arr = d));
    this.pres.asObservable().subscribe((d) => (this.presList = d));

    this._uploadReportService.getuser();
    this.alluser = this._uploadReportService
      .cast9Listener()
      .subscribe((data) => {
        this.obj = data;
        this.users = JSON.parse(this.obj);
        var x = 0;
        this.users.forEach((element) => {
          //this.temp.push(element.email)
          this.temp.push({
            id: x + 1,
            name:
              element.userId +
              " | (" +
              element.firstname +
              " " +
              element.lastname +
              ")",
          });
        });
        //var u=this.users[0]
        console.log(this.temp);
      });
    this.viewPrescriptionService.getDocsUsersPrescriptions(
      sessionStorage.getItem("uid")
    );
    this.wholeSubscription = this.viewPrescriptionService
      .getWholeUserObject()
      .subscribe((res: any) => {
        this.responsedData1 = res;
        this._flag = true;
      });
  }

  selectEvent(item) {
    this.selected = item;
    console.log("selected", this.selected);
    this.showDetails = false;
    this.submit();
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log(e);
    // do something when input is focused
  }

  submit() {
    console.log("<--->__" + JSON.stringify(this.arr));

    var x = this.selected.name;
    var y = x.split(" ");
    var pid = y[0];
    console.log("pid--", pid);
    this.http
      .get(this.registerService.UserUrl + "/getDiagnosisList/" + pid)
      .subscribe((res: any) => {
        console.log("aaray", res);
        this.list.next(res.dList);

        console.log("arr ", this.arr);
        if (this.arr.length > 0) this._preFlag = true;
        else this._preFlag = false;
      });

    this._flag = true;
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
  onClick(id: string) {}
 
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
