import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 importante
//importar lo del router-outlet
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet, CommonModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
    constructor(public router: Router) {}
}
