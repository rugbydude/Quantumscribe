import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Document } from '../../models/document.model';
import * as DocumentActions from '../../store/document/document.actions';
import * as DocumentSelectors from '../../store/document/document.selectors';

@Component({
  selector: 'app-document-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Project Documents</h3>
        <button mat-raised-button color="primary" (click)="openUploadDialog()">
          Upload Document
        </button>
      </div>

      <mat-table [dataSource]="documents$ | async" class="w-full">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
          <mat-cell *matCellDef="let document">
            <mat-icon class="mr-2">description</mat-icon>
            {{ document.name }}
          </mat-cell>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <mat-header-cell *matHeaderCellDef>Type</mat-header-cell>
          <mat-cell *matCellDef="let document">{{ document.type }}</mat-cell>
        </ng-container>

        <!-- Created Date Column -->
        <ng-container matColumnDef="createdAt">
          <mat-header-cell *matHeaderCellDef>Created</mat-header-cell>
          <mat-cell *matCellDef="let document">
            {{ document.createdAt | date }}
          </mat-cell>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let document">
            <button mat-icon-button (click)="downloadDocument(document)">
              <mat-icon>download</mat-icon>
            </button>
            <button mat-icon-button (click)="deleteDocument(document)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `
})
export class DocumentListComponent implements OnInit {
  @Input() projectId: string;
  documents$: Observable<Document[]>;
  displayedColumns: string[] = ['name', 'type', 'createdAt', 'actions'];

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.projectId) {
      this.store.dispatch(DocumentActions.loadDocuments({ projectId: this.projectId }));
      this.documents$ = this.store.select(DocumentSelectors.selectAllDocuments);
    }
  }

  openUploadDialog() {
    // TODO: Implement upload document dialog
  }

  downloadDocument(document: Document) {
    // TODO: Implement document download
  }

  deleteDocument(document: Document) {
    // TODO: Implement document deletion
  }
}
