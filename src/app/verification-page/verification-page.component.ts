import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {finalize} from "rxjs";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatTable} from "@angular/material/table";
import {Company} from "../main-page/main-page.component";

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

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.loading = false;
    this.success = true;

    this.rcNumber = this.route.snapshot.paramMap.get('rcNumber');
this.verifyCertificate(this.rcNumber as string);
  }


  verifyCertificate(rcNumber: string) {
    this.loading = true;

    this.http.get(`http://23.22.108.122:8080/verify/${rcNumber}`).pipe(finalize(() => {
      this.loading = false;
    }))
      .subscribe((result: any) => {
        this.company = result;
      })
  }
}
