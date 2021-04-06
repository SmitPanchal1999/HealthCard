import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";
import { LabHomeService } from "./lab-home.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-lab-home",
  templateUrl: "./lab-home.component.html",
  styleUrls: ["./lab-home.component.css"]
})
export class LabHomeComponent implements OnInit {

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
    this.LabHomeService.getLabDiagnoses();
    this.diagSubscription = this.LabHomeService.getDiagSubject().subscribe(
      (res: any) => {
        if(res == null || res[0] === undefined){
          this.Toastr.warning("No pending reports available");
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

  onFileSelected(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onClick(id: string) {
  }

  upload(userId: string,daignoses_id: string){
    //console.log("UID", id)
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:8000/api/lab/upload/'+userId + "/"+sessionStorage.getItem('uid') + "/" + daignoses_id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.Toastr.success("Report uploaded successfully");
  }

}
