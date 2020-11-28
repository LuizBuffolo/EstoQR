import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-qr',
  templateUrl: './search-qr.component.html',
  styleUrls: ['./search-qr.component.css']
})
export class SearchQrComponent implements OnInit {
  userId: String;
  machineId: String;

  constructor(private route: ActivatedRoute, private route2: Router) {
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit() {
  }

  onBack() {
    this.route2.navigate(['/dashboard/' + this.userId]);
  }

  onSearch() {
    this.route2.navigate(['/dashboard/' + this.userId + '/qr/' + this.machineId]);
  }
}
