import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MachinesComponent } from "./machines/machines.component";
import { MachinelistComponent } from './machines/machine-list/machine-list.component';
import { MachineComponent } from "./machines/machine/machine.component";
import { MachineService } from './machines/machine-shared/machine.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeripheralComponent } from './peripherals/peripheral/peripheral.component';
import { PeripheralsComponent } from './peripherals/peripherals.component';
import { PeripherallistComponent } from './peripherals/peripheral-list/peripheral-list.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { MonitorComponent } from './monitors/monitor/monitor.component';
import { MonitorlistComponent } from './monitors/monitor-list/monitor-list.component';
import { AppRoutingModule } from './app.routing.module';
import { MachineEditComponent } from './machines/machine/machine-edit.component';
import { MonitorEditComponent } from './monitors/monitor/monitor-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterMachineComponent } from './register-machine/register-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    MachinesComponent,
    MachinelistComponent,
    MachineComponent,
    HomeComponent,
    PeripheralComponent,
    PeripheralsComponent,
    PeripherallistComponent,
    MonitorsComponent,
    MonitorComponent,
    MonitorlistComponent,
    MachineEditComponent,
    MonitorEditComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegisterMachineComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [MachineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
