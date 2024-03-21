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
import {FixMeLater, QRCodeElementType, QRCodeModule} from "angularx-qrcode";
import {SafeUrl} from "@angular/platform-browser";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

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
    RouterOutlet, HttpClientModule, MatSlideToggle, MatToolbar, MatHeaderCell, MatTable, MatCell, MatColumnDef, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, MatIconButton, MatIcon, NgIf, QRCodeModule],

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {


  displayedColumns: string[] = ['id', 'name', 'rcNumber', 'action'];
  dataSource: Company[] = [];

  USER_COMPANY_URL: string = `http://23.22.108.122:8080/barcodes/user`;

  imageUrl!: string;
  name!: string;

  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.dataSource = ELEMENT_DATA;
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
    QRCodeModule,
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
    MatButtonToggle,
    MatButtonToggleGroup,
  ],
})
export class DialogOverviewExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {
  }

  imageUrl!: string;
  // imageBlob!: Blob;


  // getQrCode() {
  //   // Replace 'backend-image-url' with the actual URL of your backend API that returns the image
  //   return this.http.get(`http://23.22.108.122:8080/barcodes/downloadQR/${this.data.imageUrl}`, {responseType: 'blob'}).subscribe((response: Blob) => {
  //     this.imageBlob = response;
  //     // Convert the Blob response to a URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(response);
  //   });
  // }


  ngOnInit(): void {
    this.imageUrl = `http://23.22.108.122:3001/verify/${this.data.imageUrl}`
    console.log("DialogOverviewExampleDialog/ngOnInit/" + this.data.imageUrl);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
// Re-enable, when a method to download images has been implemented
  onChangeURL(url: SafeUrl) {
    this.qrCodeSrc = url
  }



  public qrCodeSrc!: SafeUrl
  public elementType: QRCodeElementType = 'img'
  saveAsImage(parent: FixMeLater) {
    let parentElement = null


    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "angularx-qrcode"
      link.click()
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }
}

export class Company {

  "id": string;
  "rcNumber": string;
  "name": string

}

export const ELEMENT_DATA: Company[] = [
  {id:"QC-121357", rcNumber:"RC-121357", name:"ExxonMobil"},
  {id:"QC-121358", rcNumber:"RC-121358", name:"Dangote Cement"},
  {id:"QC-121359", rcNumber:"RC-121359", name:"TotalEnergies"},
  {id:"QC-121387", rcNumber:"RC-121387", name:"MTN Nigeria"},
  {id:"QC-121457", rcNumber:"RC-121457", name:"Nestle Nigeria"},
  {id:"QC-121347", rcNumber:"RC-121347", name:"BUA Cement"},
  {id:"QC-121337", rcNumber:"RC-121337", name:"Chevron"},

];

