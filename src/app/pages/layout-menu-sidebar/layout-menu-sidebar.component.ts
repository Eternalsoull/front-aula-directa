import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-menu-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './layout-menu-sidebar.component.html',
  styleUrl: './layout-menu-sidebar.component.css'
})
export class LayoutMenuSidebarComponent implements OnInit, OnDestroy {
  userRole: string | null = null;
  private roleSub!: Subscription;

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.roleSub = this.authService.role$.subscribe(role => {
      this.userRole = role;
      console.log('🟢 Rol recibido:', this.userRole);
    });
  }

  ngOnDestroy(): void {
    this.roleSub.unsubscribe();
  }
}
