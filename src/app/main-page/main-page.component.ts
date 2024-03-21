import {Component, Inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MatSlideToggle, MatToolbar, MatHeaderCell, MatTable, MatCell, MatColumnDef, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, MatIconButton, MatIcon, NgIf,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatToolbar,
    RouterOutlet, HttpClientModule, MatSlideToggle, MatToolbar, MatHeaderCell, MatTable, MatCell, MatColumnDef, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, MatIconButton, MatIcon, NgIf],

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {


  displayedColumns: string[] = ['id', 'name', 'rcNumber', 'action'];
  dataSource: Company[] = [];

  USER_COMPANY_URL: string = `http://localhost:8080/barcodes/user`;

  imageUrl!: string;
  name!: string;

  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.getCompany();
  }

  openDialog(company: Company): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name, imageUrl: company.rcNumber},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.imageUrl = result;
    });
  }

  getCompany() {
    return this.http.get<Company[]>(`${this.USER_COMPANY_URL}`).subscribe(result => {
      this.dataSource = result;
      console.log(result)
    }, error => {
      console.log(error)
    });
  }
}


export interface DialogData {
  imageUrl: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
  ],
})
export class DialogOverviewExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient) {
  }

  imageUrl!: string;
  imageBlob!: Blob;


  getQrCode() {
    // Replace 'backend-image-url' with the actual URL of your backend API that returns the image
    return this.http.get(`http://localhost:8080/barcodes/downloadQR/${this.data.imageUrl}`, {responseType: 'blob'}).subscribe((response: Blob) => {
      this.imageBlob = response;
      // Convert the Blob response to a URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(response);
    });
  }


  ngOnInit(): void {
    this.getQrCode();
    console.log("DialogOverviewExampleDialog/ngOnInit/" + this.data.imageUrl);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  downloadImage(): void {
    const url = window.URL.createObjectURL(this.imageBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.png';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

export class Company {

  "id": string;
  "rcNumber": string;
  "name": string

}
