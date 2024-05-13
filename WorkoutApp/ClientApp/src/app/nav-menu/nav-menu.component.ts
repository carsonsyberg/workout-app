import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Component({
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        top: '80px',
        opacity: 1,
      })),
      state('closed', style({
        top: '-200px',
        opacity: 0.75,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ]),
    trigger('overlayOpen', [
      // ...
      state('open', style({
        display: 'block',
        opacity: 0.25,
      })),
      state('closed', style({
        display: 'none',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ],
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  onHomePage = false;

  isLoggedIn = true;
  firstLoad = true;
  constructor(private router: Router, private accountService: AccountService) {

    this.isLoggedIn = accountService.isLoggedIn;

    if (this.firstLoad) {
      if (this.isLoggedIn) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/login']);
      }
    }

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        console.log(event);
        if (event.url === '/home' || event.url === "/") {
          console.log("ON HOME APGE")
          this.onHomePage = true;
        }
        else {
          this.onHomePage = false;
        }
      }
    });
  }

  clickHomeOnHomePage() {
    window.location.reload();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    console.log("toggled")
    this.isExpanded = !this.isExpanded;
  }

  onMouseOut() {
    this.isExpanded = false;
  }

  ngOnInit() {
    console.log(this.router.url);
  }
}
