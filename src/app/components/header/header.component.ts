import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:IUser;
  constructor() {
    this.user = {
      name: 'Ehab',
      nid: 30110172100699
    }
  }

  ngOnInit(): void {
  }

}
