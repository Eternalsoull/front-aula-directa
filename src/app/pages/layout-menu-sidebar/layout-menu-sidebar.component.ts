import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 importante
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-menu-sidebar',
  imports: [ RouterOutlet, CommonModule ],
  templateUrl: './layout-menu-sidebar.component.html',
  styleUrl: './layout-menu-sidebar.component.css'
})
export class LayoutMenuSidebarComponent {
  constructor(public router: Router) {}

}
