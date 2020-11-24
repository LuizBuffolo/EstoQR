import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../monitor-shared/monitor.service';
import { Monitor } from '../monitor-shared/monitor.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-monitor-list',
    templateUrl: './monitor-list.component.html',
    styles: []
})

export class MonitorlistComponent implements OnInit {
  monitors: Monitor[];

  tableHeader: string[] = new Array(
    "Fabricante",
    "Tamanho",
    "Usuário"
  );

  constructor(private service: MonitorService, private route: Router) {
  }

  ngOnInit() {
    this.refreshMonitors();
    this.service.currentMonitors.subscribe(monitors => this.monitors = monitors);
  }

  refreshMonitors() {
    this.service.refreshList().subscribe(
      (data) => {
        this.service.changeMonitors(data as Monitor[]);
        console.log(this.monitors);
      },
      err => {
        if (err.status == 404) {
          this.service.changeMonitors(null);
        }
      });
  }

  onDelete(id) {
    this.service.deleteMonitor(id).subscribe(res => {
      this.refreshMonitors();
    });
  }

  onInfo(id) {
    this.route.navigate(['/monitor/' + id])
  }
}
