import { Component, OnInit } from '@angular/core';
import { Peripheral } from '../peripheral-shared/peripheral.model';
import { PeripheralService } from '../peripheral-shared/peripheral.service'

@Component({
    selector: 'app-peripheral-list',
    templateUrl: './peripheral-list.component.html',
    styles: []
})

export class PeripherallistComponent implements OnInit {
  peripheral: Peripheral[];

  tableHeader: string[] = new Array(
    "Hostname",
    "Modelo",
    "Fabricante"
  );

  constructor(private service: PeripheralService) {
  }

  ngOnInit() {
    this.refreshPeripherals();
    console.log(this.peripheral);
  }

  refreshPeripherals() {
    this.service.refreshList().subscribe(
      (data) => {
        this.peripheral = data as Peripheral[];
        this.service.refreshList();
      });
  }

  onDelete(Id) {
    this.service.deletePeripheral(Id).subscribe(res => {
      this.service.refreshList
    },
      err => {
        console.log(err)
    });
  }
}
