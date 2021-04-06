import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  clientHeight: number;
  title = "HealthCard";
  constructor() {
    this.clientHeight = window.innerHeight;
  }
}
