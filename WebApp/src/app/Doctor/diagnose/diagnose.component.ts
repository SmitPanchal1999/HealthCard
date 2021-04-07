import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/register.service";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AddPrescriptionComponent } from "../Prescription/add-prescription/add-prescription.component";
import { AddPrescriptionService } from "../Prescription/add-prescription/add-prescription.service";

@Component({
  selector: "app-diagnose",
  templateUrl: "./diagnose.component.html",
  styleUrls: ["./diagnose.component.css"],
  providers: [DatePipe],
})
export class DiagnoseComponent implements OnInit {
  public userId;
  public userData;
  public hospital;
  public today: any;
  public today1: any;
  public temp = [];
  public user;
  public selected;
  public users;
  public alluser;
  public obj;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public keyword = "name";
  constructor(
    private register: RegisterService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private router: Router,
    private _addPrescriptionService: AddPrescriptionService
  ) {
    this.userId = sessionStorage.getItem("uid");this.http
    .get(
      this.register.registerUrl +
        "/commonUserData/" +
        sessionStorage.getItem("uid")
    )
    .subscribe((res: any) => {
      this.userData = res.userData;
    });
  }

  ngOnInit() {
    this.today = this.datePipe.transform(new Date(), "dd-M-yyyy");

    this.today1 = this.today;
    console.log(this.today);

    this._addPrescriptionService.getuser();
    this.alluser = this._addPrescriptionService
      .cast9Listener()
      .subscribe((data) => {
        this.obj = data;
        this.users = JSON.parse(this.obj);
        var x = 0;
        this.users.forEach((element) => {
          this.temp.push({
            id: x + 1,
            name:
              element.userId +
              " | " +
              element.firstname +
              " " +
              element.lastname,
          });
          console.log("proo" + element.email);
        });
        //var u=this.users[0]
        console.log(this.temp);
      });
    // this.users = JSON.parse(this.obj);
  }

  selectEvent(item) {
    this.selected = item;
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

  addDiagnosis(form) {
    // console.log(form)
    var x = this.selected.name;
    var y = x.split(" ");
    //console.log("ddeemmo"+y)
    var docId = this.userId;
    var date = this.today;
    var pid = y[0];
    var uname = y[2] + " " + y[3];
    var dname = this.userData.firstname;
    var symptoms = form.symptoms.value;
    var reports = form.reports.value;
    console.log(pid, symptoms, reports);
    this.http
      .post(this.register.doctocUrl + "/Add/Diagnosis", {
        docId,
        date,
        pid,
        dname,
        uname,
        symptoms,
        reports,
      })
      .subscribe((d: any) => {
        console.log(d);
        if (d.success) {
          sessionStorage.setItem("dId", d.diagnosisId);
          this.router.navigate(["/Prescription/Add"]);
        }
      });
  }
}
