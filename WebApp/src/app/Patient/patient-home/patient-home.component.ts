import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/register.service";
import htmlToImage from "html-to-image";
import * as jspdf from "jspdf";   

@Component({
  selector: "app-patient-home",
  templateUrl: "./patient-home.component.html",
  styleUrls: ["./patient-home.component.css"]   
})
export class PatientHomeComponent implements OnInit {
public userData;
  public userId;
  constructor(private registerService: RegisterService) {
    this.registerService.userData
      .asObservable()
      .subscribe(data => (this.userData = data));
    this.userId = sessionStorage.getItem("uid");

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
