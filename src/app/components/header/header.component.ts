import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() isDetailsMode = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.listenToRouteParams();
  }

  listenToRouteParams() {
    this.route.paramMap.subscribe((params: Params) => {
      const airportId = params.get(['id']);
      if (airportId) {
        this.isDetailsMode = true;
      }
    });
  }

  onBackClick() {
    this.router.navigate(['airports']);
  }
}
