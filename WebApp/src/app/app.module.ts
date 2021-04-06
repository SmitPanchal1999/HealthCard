import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { Signup2Component } from "./signup2/signup2.component";
import { ToastrModule } from "ngx-toastr";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { UploadreportComponent } from "./Lab/uploadreport/uploadreport.component";
import { PatientHomeComponent } from "./Patient/patient-home/patient-home.component";
import { QRCodeModule } from "angularx-qrcode";
import { AddPrescriptionComponent } from "./Doctor/Prescription/add-prescription/add-prescription.component";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { ViewPrescriptionComponent } from "./Doctor/Prescription/view-prescription/view-prescription.component";
import { ViewPrescriptionPatientComponent } from "./Patient/view-prescription-patient/view-prescription-patient.component";
import { ViewProfilePatientComponent } from "./Patient/view-profile-patient/view-profile-patient.component";
import { UpdateProfilePatientComponent } from "./Patient/update-profile-patient/update-profile-patient.component";
import { UpdateProfileDoctorComponent } from "./Doctor/update-profile-doctor/update-profile-doctor.component";
import { ViewProfileDoctorComponent } from "./Doctor/view-profile-doctor/view-profile-doctor.component";
import { DiagnoseComponent } from "./Doctor/diagnose/diagnose.component";
import { HomeComponent } from "./home/home.component";
import { LabHomeComponent } from "./Lab/lab-home/lab-home.component";
import { TableModule } from "primeng/table";
import { UplodedreportsComponent } from './Lab/uplodedreports/uplodedreports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    FooterComponent,
    Signup2Component,
    UploadreportComponent,
    PatientHomeComponent,
    AddPrescriptionComponent,
    ViewPrescriptionComponent,
    ViewPrescriptionPatientComponent,
    ViewProfilePatientComponent,
    UpdateProfilePatientComponent,
    UpdateProfileDoctorComponent,
    ViewProfileDoctorComponent,
    DiagnoseComponent,
    HomeComponent,
    LabHomeComponent,
    UplodedreportsComponent,
  ],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    QRCodeModule,
    TableModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right",
      preventDuplicates: false,
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
