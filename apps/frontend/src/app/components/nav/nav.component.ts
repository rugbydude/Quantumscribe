import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <span>QuantumScribe</span>
      <span class="flex-1"></span>
      
      <ng-container *ngIf="authService.currentUser$ | async as user">
        <!-- Admin Links -->
        <ng-container *ngIf="authService.hasRole('ADMIN')">
          <button mat-button routerLink="/admin">
            <mat-icon>admin_panel_settings</mat-icon>
            Admin
          </button>
        </ng-container>

        <!-- Project Manager Links -->
        <ng-container *ngIf="authService.hasRole('PROJECT_MANAGER')">
          <button mat-button routerLink="/projects/create">
            <mat-icon>add</mat-icon>
            New Project
          </button>
        </ng-container>

        <!-- Common Links -->
        <button mat-button routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon>
          Dashboard
        </button>
        
        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>person</mat-icon>
          {{ user.email }}
        </button>
        
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/profile">Profile</button>
          <button mat-menu-item (click)="authService.logout()">Logout</button>
        </mat-menu>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .flex-1 {
      flex: 1;
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `]
})
export class NavComponent {}
