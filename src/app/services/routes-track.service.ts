import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesTrackService {
  prevPath: string = '';
  currentPath: string = '';
  constructor(
    private router: Router
  ) {
    this.currentPath = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.prevPath = this.currentPath;
        this.currentPath = event.url;
      }
    })
  }
}
