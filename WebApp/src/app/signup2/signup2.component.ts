import { LabService } from "./lab.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Subscription } from "rxjs";

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"],
})
export class Signup2Component implements OnInit {
  public fname: string;
  public lname: string;
  public password: string;
  public blood: string;
  public user: string;
  public dob: string;
  public userId: string;
  public address: string;
  public contact: string;
  public email: string;
  public selectedItems: any[];
  public dropdownList = [];
  public selectedItemsDoc: any[];
  public dropdownListDoc = [];
  public finSpecialities: Array<string> = [];
  public specialities: any[] = [
    {
      speciality: "",
    },
  ];

  public dropdownSettings: IDropdownSettings;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private Toastr: ToastrService,
    private register: RegisterService,
    private labService: LabService
  ) {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: "Full Blood Examination" },
      { item_id: 2, item_text: "Iron studies" },
      {
        item_id: 3,
        item_text: "TSH (Thyroid Stimulating Hormone) Quantification",
      },
      { item_id: 4, item_text: "Urinalysis" },
      { item_id: 5, item_text: "INR (International Normalized Ratio)" },
    ];
    this.dropdownListDoc = [
      { item_id: 1, item_text: "Allergists" },
      { item_id: 2, item_text: "Anesthesiologists" },
      { item_id: 3, item_text: "Cardiologists" },
      { item_id: 4, item_text: "Colon and Rectal Surgeons" },
      { item_id: 5, item_text: "Critical Care Medicine Specialists" },
      { item_id: 6, item_text: "Dermatologists" },
      { item_id: 7, item_text: "Endocrinologists" },
      { item_id: 8, item_text: "Emergency Medicine Specialists" },
      { item_id: 9, item_text: "Family Physicians" },
      { item_id: 10, item_text: "Gastroenterologists" },
      { item_id: 11, item_text: "Geriatric Medicine Specialists" },
      { item_id: 12, item_text: "Hematologists" },
      { item_id: 13, item_text: "Hospice and Palliative Medicine Specialists" },
      { item_id: 14, item_text: "Infectious Disease Specialists" },
      { item_id: 15, item_text: "Internists" },
      { item_id: 16, item_text: "Nephrologists" },
      { item_id: 17, item_text: "Neurologists" },
      { item_id: 18, item_text: "Obstetricians and Gynecologists" },
      { item_id: 19, item_text: "Oncologists         " },
      { item_id: 20, item_text: "Ophthalmologists" },
      { item_id: 21, item_text: "Osteopaths" },
      { item_id: 22, item_text: "Otolaryngologists" },
      { item_id: 23, item_text: "Pathologists" },
      { item_id: 24, item_text: "Physiatrists" },
      { item_id: 25, item_text: "Plastic Surgeons" },
      { item_id: 26, item_text: "Podiatrists" },
      { item_id: 27, item_text: "Psychiatrists" },
      { item_id: 28, item_text: "Pulmonologists" },
      { item_id: 29, item_text: "Radiologists" },
      { item_id: 30, item_text: "Sports Medicine Specialists" },
      { item_id: 31, item_text: "General Surgeons" },
      { item_id: 32, item_text: "Urologists" },
    ];
    this.selectedItems = [{ item_id: 1, item_text: "Full Blood Examination" }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      //  allowSearchFilter: true
    };

    var basicForm = history.state;
    console.log(JSON.stringify(basicForm));
    this.fname = basicForm.fname;
    this.lname = basicForm.lname;
    this.password = basicForm.password;
    this.address = basicForm.address;
    this.contact = basicForm.contact;
    this.blood = basicForm.blood;
    this.user = basicForm.user;
    this.email = basicForm.email;
    this.dob = basicForm.dob;
    this.address = basicForm.address;
    this.email = basicForm.email;
    this.contact = basicForm.contact;
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    // this.labService.getSpecialityArray();
    // this.sub1 = this.labService.getSpecList().subscribe((list: []) => {
    //   this.dropdownListDoc = list;
    // });

    // this.dropdownList = this.register.getSpecialityArray();
    // Uncomment after ready getId ready in register.service.ts
    // this.userId = this.register.getId(
    //   this.fname,
    //   this.lname,
    //   this.user,
    //   this.dob
    // );
  }

  registerLab(form) {
    console.log("signup 2 dob" + this.dob);
    var licence = form.licence.value;
    var labname = form.lab_name.value;
    var DOE = form.DOE.value;
    var lab_address = form.address.value;
    if (licence && labname && DOE && lab_address) {
      //  var l=form.l1.value;
      console.log("selected", this.selectedItems);
      //qvar contact = form.contact.value;
      //console.log(licence, shopname);
      this.labService.register(
        this.password,
        this.fname,
        this.lname,
        this.email,
        this.blood,
        this.dob,
        this.contact,
        this.address,
        this.user,
        licence,
        labname,
        DOE,
        lab_address,
        this.selectedItems
      );
      this.router.navigate(["/Login"]);
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
  addSpeciality() {
    this.specialities.push({
      speciality: "",
    });
  }

  removeSpeciality(i: number) {
    this.specialities.splice(i, 1);
  }

  registerDoc(form) {
    this.selectedItemsDoc.forEach((spec) => {
      this.finSpecialities.push(spec.item_text);
    });
    this.specialities.forEach((spec) => {
      if (spec.speciality.trim() != "") {
        this.finSpecialities.push(spec.speciality);
      }
    });

    if (
      form.licence.value &&
      form.degree.value &&
      form.work_name.value &&
      form.work_contact.value &&
      form.work_address.value &&
      (this.selectedItemsDoc || this.specialities)
    ) {
      this.register.registeDoc(
        this.fname,
        this.lname,
        this.password,
        this.address,
        this.contact,
        this.dob,
        this.blood,
        this.email,
        this.user,
        form.licence.value,
        form.degree.value,
        this.finSpecialities,
        form.work_name.value,
        form.work_contact.value,
        form.work_address.value
      );
      this.router.navigate(["/Login"]);
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
}
