import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/register.service";
import htmlToImage from "html-to-image";
import * as jspdf from "jspdf";   
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-patient-home",
  templateUrl: "./patient-home.component.html",
  styleUrls: ["./patient-home.component.css"]   
})
export class PatientHomeComponent implements OnInit {
public userData;
  public userId;
  constructor(private registerService: RegisterService, private http: HttpClient) {
    this.http
      .get(
        this.registerService.registerUrl +
          "/commonUserData/" +
          sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        console.log("RESponse" + JSON.stringify(res));
        this.userData = res.userData;
      });

  }

  ngOnInit() {}

  toPdf() {
    var card = document.getElementById("healthcard");
    htmlToImage.toPng(card, { height: 350 }).then(url => {
      var img = new Image();
      img.src = url;
      let pdf = new jspdf("p", "mm", "A4");
      pdf.addImage(url, "PNG", 20, 120);
      pdf.save("healthcard.pdf");
    });
  }
}
