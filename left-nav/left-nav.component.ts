import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { navabarData } from './nav-data';
import { AuthenticationService } from '../authentication/authentication/authentication.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css',
})
export class LeftNavComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}
  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
  }
  @Input()
  collapse: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    window.addEventListener('resize', (e) => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 960) {
      }
      if (windowWidth < 960) {
        // alert('less than 960');
        this.onToggleSideNav.emit({
          collapsed: this.collapsed,
          screenWidth: windowWidth,
        });
      }
    });

    this.screenwidth = window.innerWidth;
    console.log(this.screenwidth);
    if (this.screenwidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenwidth,
      });
    }
  }

  logout() {
    alert('You have successfuly logout ');
    this.auth.logout();
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  sidebarVisible: boolean = false;

  collapsed = true;

  screenwidth = 0;
  navData = navabarData;

  togglebutton() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenwidth,
    });
  }

  @Output() onsildeup: EventEmitter<boolean> = new EventEmitter();

  closebutton() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenwidth,
    });
  }
}
