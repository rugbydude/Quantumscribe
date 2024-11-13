import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { EditUserRolesComponent } from './edit-user-roles.dialog';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">User Management</h2>
        <mat-form-field class="w-64">
          <mat-label>Search Users</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Search by email or name">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <mat-table [dataSource]="users$ | async" class="w-full">
        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
          <mat-cell *matCellDef="let user">{{user.email}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="roles">
          <mat-header-cell *matHeaderCellDef>Roles</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <mat-chip-list>
              <mat-chip *ngFor="let role of user.roles">{{role}}</mat-chip>
            </mat-chip-list>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <button mat-icon-button (click)="editUserRoles(user)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="confirmDeactivate(user)">
              <mat-icon>block</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `
})
export class UserManagementComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns = ['email', 'roles', 'actions'];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.users$ = this.adminService.getUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.adminService.getUsers();
  }

  editUserRoles(user: User) {
    const dialogRef = this.dialog.open(EditUserRolesComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.updateUserRoles(user.id, result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  confirmDeactivate(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deactivate User',
        message: `Are you sure you want to deactivate ${user.email}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deactivateUser(user.id).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  applyFilter(event: Event) {
    // TODO: Implement filtering logic using the input value
    (event.target as HTMLInputElement).value.toLowerCase();
  }
}
