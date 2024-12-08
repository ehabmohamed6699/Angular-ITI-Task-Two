import { Component, OnDestroy, OnInit } from '@angular/core';
import { error } from 'console';
import { Observable, Subscription } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  services: Subscription[];
  showAd: boolean = false;
  adText: string = '';
  constructor(
    private adsService:AdsService
  ) {
    this.services = [];
  }
  ngOnDestroy(): void {
    this.services.forEach(service => {
      service.unsubscribe();
    })

    this.adText = '';
    this.showAd = false;
  }

  ngOnInit(): void {
    let options = {
      next: (ad: string) => {
        this.adText = ad;
        this.showAd = true;
        let timer = setTimeout(() => {
          this.showAd = false;
          this.adText = '';
          clearTimeout(timer);
        }, 5000);
      },
      complete: () => {
        console.log('No more ads');
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    let service = this.adsService.getAds(10).subscribe(options);
    this.services.push(service);
  }

  closeModal(){
    this.showAd = false;
  }

}
