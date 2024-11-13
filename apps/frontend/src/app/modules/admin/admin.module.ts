import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard.component';
import { UserManagementComponent } from '../../components/admin/user-management.component';
import { EditUserRolesComponent } from '../../components/admin/edit-user-roles.dialog';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    EditUserRolesComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
