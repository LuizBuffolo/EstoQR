import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MachinesComponent } from "./machines/machines.component";
import { MonitorsComponent } from "./monitors/monitors.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "machines", component: MachinesComponent },
  { path: "monitors", component: MonitorsComponent },
];

