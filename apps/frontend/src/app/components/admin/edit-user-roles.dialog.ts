import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user-roles-dialog',
  template: `
    <h2 mat-dialog-title>Edit User Roles</h2>
    <mat-dialog-content>
      <form [formGroup]="rolesForm">
        <div class="flex flex-col gap-2">
          <mat-checkbox formControlName="ADMIN">Administrator</mat-checkbox>
          <mat-checkbox formControlName="PROJECT_MANAGER">Project Manager</mat-checkbox>
          <mat-checkbox formControlName="TEAM_MEMBER">Team Member</mat-checkbox>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `
})
export class EditUserRolesComponent {
  rolesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.rolesForm = this.fb.group({
      ADMIN: [data.user.role === 'ADMIN'],
      PROJECT_MANAGER: [data.user.role === 'PROJECT_MANAGER'],
      TEAM_MEMBER: [data.user.role === 'TEAM_MEMBER']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const selectedRoles = Object.entries(this.rolesForm.value)
      .filter(([, selected]) => selected)
      .map(([role]) => role);
    this.dialogRef.close(selectedRoles);
  }
}
