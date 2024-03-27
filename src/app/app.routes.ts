import { Routes } from '@angular/router';
import {VerificationPageComponent} from "./verification-page/verification-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

export const routes: Routes = [

  {path:"", component: MainPageComponent},
  {path:"main", component: MainPageComponent},
  {path:"verify/:rcNumber", data:{}, component: VerificationPageComponent},
  {path:"**", component: ErrorPageComponent},
];
