import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Monitor } from '../monitor-shared/monitor.model';
import { MonitorService } from '../monitor-shared/monitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styles: []
})

export class MonitorComponent implements OnInit {
  monitors: Monitor[];
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

  constructor(
    private service: MonitorService
  ) { }

  ngOnInit() {
    this.resetForm();
    this.service.currentMonitors.subscribe(monitors => this.monitors = monitors);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onSubmit(form?: NgForm) {
    var f = form
    this.service.postMonitor(this.monitor).subscribe(
      res => {
        this.resetForm(f);
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeMonitors(data as Monitor[]);
          });
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

