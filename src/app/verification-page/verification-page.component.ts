import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {finalize} from "rxjs";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatTable} from "@angular/material/table";
import {Company, ELEMENT_DATA} from "../main-page/main-page.component";
import {LogicalFileSystem} from "@angular/compiler-cli";

@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    NgIf,
    MatTable
  ],
  templateUrl: './verification-page.component.html',
  styleUrl: './verification-page.component.scss'
})
export class VerificationPageComponent {
  loading: boolean = false;
  success: boolean = false;

  rcNumber: string | null = ''

  company!:Company;

  constructor(private route: ActivatedRoute) {
    this.loading = false;
    this.success = true;

    this.rcNumber = this.route.snapshot.paramMap.get('rcNumber');
this.verifyCertificate(this.rcNumber as string);


  }




  verifyCertificate(rcNumber: string) {
      console.log("verifyCertificate/rcNumber"+rcNumber)
    ELEMENT_DATA.forEach(company=>{
      if (company.rcNumber.trim() == rcNumber.trim()){
          console.log("match found")
        this.company = company;
          console.log(company)
      }
    })
  }
}
