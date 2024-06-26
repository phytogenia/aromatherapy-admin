import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Functions} from "./utils/functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }


}
