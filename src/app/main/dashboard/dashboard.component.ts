import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileActive: boolean = true;
  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    let curSeg = this.router.url;
    
    if(curSeg === '/dashboard/profile') {
      this.profileActive = true;
    }
    else {
      this.profileActive = false;
    }
  }

  goToProfile() {
    this.profileActive = true;
    this.router.navigate(['/dashboard/profile']);
  }

  goToBoards() {
    this.profileActive = false;
    this.router.navigate(['/dashboard/boards']);
  }

}
