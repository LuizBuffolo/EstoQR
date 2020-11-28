import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MachinesComponent } from "./machines/machines.component";
import { MonitorsComponent } from "./monitors/monitors.component";
import { MachineEditComponent } from "./machines/machine/machine-edit.component";
import { MonitorEditComponent } from "./monitors/monitor/monitor-edit.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterMachineComponent } from "./register-machine/register-machine.component";
import { ViewRequestComponent } from "./view-request/view-request.component";
import { ViewQrComponent } from "./view-qr/view-qr.component";
import { SearchQrComponent } from "./search-qr/search-qr.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "machines", component: MachinesComponent },
  { path: "monitors", component: MonitorsComponent },
  { path: "machine/:id", component: MachineEditComponent },
  { path: "monitor/:id", component: MonitorEditComponent },
  { path: "dashboard/:id", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: ":id/register", component: RegisterComponent },
  { path: ":id/register-machine", component: RegisterMachineComponent },
  { path: "dashboard/:id/request/:idrequest", component: ViewRequestComponent },
  { path: "dashboard/:id/qr/:idmachine", component: ViewQrComponent },
  { path: "dashboard/:id/search", component: SearchQrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
