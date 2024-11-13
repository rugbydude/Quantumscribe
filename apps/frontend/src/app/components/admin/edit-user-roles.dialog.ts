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
export class EditUserRolesDialog {
  rolesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserRolesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.rolesForm = this.fb.group({
      ADMIN: [data.user.roles.includes('ADMIN')],
      PROJECT_MANAGER: [data.user.roles.includes('PROJECT_MANAGER')],
      TEAM_MEMBER: [data.user.roles.includes('TEAM_MEMBER')]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const selectedRoles = Object.entries(this.rolesForm.value)
      .filter(([_, selected]) => selected)
      .map(([role]) => role);
    this.dialogRef.close(selectedRoles);
  }
}
