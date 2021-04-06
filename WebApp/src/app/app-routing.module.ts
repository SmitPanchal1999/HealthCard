import { LabHomeComponent } from "./Lab/lab-home/lab-home.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { Signup2Component } from "./signup2/signup2.component";
import { PatientHomeComponent } from "./Patient/patient-home/patient-home.component";
import { PatientGuard } from "./Gaurds/patient.guard";
import { AddPrescriptionComponent } from "./Doctor/Prescription/add-prescription/add-prescription.component";
import { UploadreportComponent } from "./Lab/uploadreport/uploadreport.component";
import { DoctorGuard } from "./Gaurds/Docter/doctor.guard";
import { LabGuard } from "./Gaurds/Lab/lab.guard";
import { ViewPrescriptionComponent } from "./Doctor/Prescription/view-prescription/view-prescription.component";
import { ViewPrescriptionPatientComponent } from "./Patient/view-prescription-patient/view-prescription-patient.component";
import { ViewProfilePatientComponent } from "./Patient/view-profile-patient/view-profile-patient.component";
import { UpdateProfilePatientComponent } from "./Patient/update-profile-patient/update-profile-patient.component";
import { ViewProfileDoctorComponent } from "./Doctor/view-profile-doctor/view-profile-doctor.component";
import { UpdateProfileDoctorComponent } from "./Doctor/update-profile-doctor/update-profile-doctor.component";
import { DiagnoseComponent } from "./Doctor/diagnose/diagnose.component";
import { HomeComponent } from "./home/home.component";
import { from } from "rxjs";
import { UplodedreportsComponent } from "./Lab/uplodedreports/uplodedreports.component";

const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "Signup", component: SignupComponent },
  { path: "Signup2", component: Signup2Component },
  { path: "", component: HomeComponent },

  {
    path: "Patient/Home",
    component: PatientHomeComponent,
    canActivate: [PatientGuard],
  },
  {
    path: "Prescription/Add",
    component: AddPrescriptionComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: "Prescription/Doctor/View",
    component: ViewPrescriptionComponent,
    canActivate: [DoctorGuard],
  },
  { path: "upload", component: UploadreportComponent, canActivate: [LabGuard] },
  {
    path: "Prescription/Patient/View",
    component: ViewPrescriptionPatientComponent,
    canActivate: [PatientGuard],
  },
  {
    path: "Patient/Profile/View",
    component: ViewProfilePatientComponent,
    canActivate: [PatientGuard],
  },
  {
    path: "Patient/Profile/Update",
    component: UpdateProfilePatientComponent,
    canActivate: [PatientGuard],
  },
  {
    path: "Doctor/Profile/View",
    component: ViewProfileDoctorComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: "Doctor/Profile/Update",
    component: UpdateProfileDoctorComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: "Diagnose",
    component: DiagnoseComponent,
    canActivate: [DoctorGuard],
  },

  {
    path: "lab/labhome",
    component: LabHomeComponent,
    canActivate: [LabGuard],
  },
  {
    path: "lab/uploadedreport",
    component: UplodedreportsComponent,
  },
  {
    path: "getPrescriptions",
    component: ViewPrescriptionComponent,
    canActivate: [DoctorGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
