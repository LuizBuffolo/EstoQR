import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MachinesComponent } from "./machines/machines.component";
import { MonitorsComponent } from "./monitors/monitors.component";
import { MachineEditComponent } from "./machines/machine/machine-edit.component";
import { MonitorEditComponent } from "./monitors/monitor/monitor-edit.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "machines", component: MachinesComponent },
  { path: "monitors", component: MonitorsComponent },
  { path: "machine/:id", component: MachineEditComponent },
  { path: "monitor/:id", component: MonitorEditComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
