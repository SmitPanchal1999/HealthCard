import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";
import { LabHomeService } from "./../lab-home/lab-home.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-uplodedreports',
  templateUrl: './uplodedreports.component.html',
  styleUrls: ['./uplodedreports.component.css']
})
export class UplodedreportsComponent implements OnInit {
  private diagSubscription: Subscription;
  private responsedData: any = [];
  private keys: any = [];
  private values: any = [];
  private columnDefs: any = [];
  private rowData:any = []
  selected:any;

  title = 'fileUpload';
  images;
  multipleImages = [];

  objectKeys = Object.keys;

  constructor(private LabHomeService: LabHomeService,private http:HttpClient,private Toastr: ToastrService,) {}

  ngOnInit() {
    this.LabHomeService.getLabuploaded();
    this.diagSubscription = this.LabHomeService.getuploadedSubject().subscribe(
      (res: any) => {
        if(res == null || res[0] === undefined){
          this.Toastr.warning("No Uploaded reports available");
        }
        else
        {
        
        
        console.log("DIAG RES FROM COMPONENT: ", res);
        console.log('RES',res[0])
        this.keys = Object.keys(res[0]);
        this.values = Object.values(res);
        this.responsedData.push(res);
        for (let i = 0; i < this.keys.length; i++) {
          
          this.columnDefs.push({ header: this.keys[i], field: this.keys[i] });
        //  console.log(this.columnDefs);
        }
        console.log(...this.columnDefs, 'COLS')
        this.rowData.push(...res);
        //console.log(...this.rowData)
      }
      }
   
    );
  }

}
