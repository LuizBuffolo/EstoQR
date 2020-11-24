import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Monitor } from '../monitor-shared/monitor.model';
import { MonitorService } from '../monitor-shared/monitor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-monitor-edit',
  templateUrl: './monitor-edit.component.html',
  styles: []
})

export class MonitorEditComponent implements OnInit {
  monitorId: String;
  check: boolean = false;

  monitor: Monitor = {
    Id: '',
    Manufacturer: '',
    Size: '',
    CFit: '',
    Sector: '',
    User: '',
    Avaiable: true
  }

  constructor(private route: ActivatedRoute, private service: MonitorService, private nav: Router) {
    this.route.params.subscribe(params => this.monitorId = params['id']);
  }

  ngOnInit(): void {
    if (this.monitorId) {
      this.getById(this.monitorId);
    }
  }

  getById(monitorId) {
    this.service.getById(monitorId).subscribe(
      res => {
        this.monitor = res as Monitor;
        console.log(this.monitor);
      },
      err => { console.log(err) }
    );
  }

  onSubmit(form?: NgForm) {
    this.service.postMonitor(this.monitor).subscribe(
      res => {
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeMonitors(data as Monitor[]);
          });
        this.nav.navigate(['/monitors']);
      },
      err => { console.log(err) }
    )
  }

  FieldsChange(values: any): boolean {
    if (values.currentTarget.checked == true) {
      this.check = true;
      this.monitor.User = 'Estoque TI';
      this.monitor.Sector = 'TI';
      console.log(this.check);
      return true;
    }
    else {
      this.check = false;
      this.monitor.User = '';
      this.monitor.Sector = '';
      console.log(this.check);
      return false;
    }
  }
  
}

