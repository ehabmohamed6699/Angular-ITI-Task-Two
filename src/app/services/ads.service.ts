import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private ads: string[];
  constructor() { 
    this.ads = [
      'Buy one get one free!',
      'Half price for the second item!',
      'Enjoy the white friday offers!',
      'Special discount for the first 10 customers!',
      'Get a free gift with every purchase!',
    ]
  }

  getAds(timeInSeconds: number): Observable<string>{
    let adsObservable = new Observable<string>(observer => {
      let index = 0;
      let timerInterval = setInterval(()=>{
        if(index < this.ads.length){
          observer.next(this.ads[index]);
          index++;
        }else{
          observer.complete();
        }
      }, timeInSeconds * 1000);
      return () => {
        clearInterval(timerInterval);
      }
    })

    return adsObservable;
  }
}
