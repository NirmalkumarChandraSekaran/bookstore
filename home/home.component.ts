import { Component, Input } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sidedivcollapased: boolean = true;
  screenwidth = 0;
  onToggleSideNav(data: SideNavToggle) {
    this.sidedivcollapased = data.collapsed;
    this.screenwidth = data.screenWidth;
  }

  @Input()
  collapse1!: boolean;
  getBodyByclass(): string {
    let styleClass = '';
    // console.log(this.screenwidth);
    // if (this.sidedivcollapased && this.screenwidth > 768) {
    //   styleClass = 'body-trimmed';
    // } else if (this.sidedivcollapased && this.screenwidth <= 768) {
    //   styleClass = 'body-md-screen';
    // } else if (!this.sidedivcollapased) {
    //   styleClass = 'body-md-screen';
    // } else {
    //   styleClass = 'body-trimmed';
    // }
    if (this.sidedivcollapased) {
      styleClass = 'false';
    } else {
      styleClass = 'true';
    }
    return styleClass;
  }
}
