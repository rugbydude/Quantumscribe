import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as TeamActions from '../../store/team/team.actions';
import * as TeamSelectors from '../../store/team/team.selectors';

@Component({
  selector: 'app-team-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Team Members</h3>
        <button mat-raised-button color="primary" (click)="openAddMemberDialog()">
          Add Member
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <mat-card *ngFor="let member of teamMembers$ | async">
          <mat-card-header>
            <div mat-card-avatar class="member-avatar">
              {{ member.firstName.charAt(0) }}{{ member.lastName.charAt(0) }}
            </div>
            <mat-card-title>
              {{ member.firstName }} {{ member.lastName }}
            </mat-card-title>
            <mat-card-subtitle>{{ member.role }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ member.email }}</p>
            <div class="mt-2">
              <mat-chip-list>
                <mat-chip *ngFor="let skill of member.skills">
                  {{ skill }}
                </mat-chip>
              </mat-chip-list>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="openMemberDetailsDialog(member)">
              View Details
            </button>
            <button mat-button color="warn" (click)="removeMember(member)">
              Remove
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .member-avatar {
      background-color: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  `]
})
export class TeamListComponent implements OnInit {
  @Input() projectId: string;
  teamMembers$: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.projectId) {
      this.store.dispatch(TeamActions.loadTeamMembers({ projectId: this.projectId }));
      this.teamMembers$ = this.store.select(TeamSelectors.selectTeamMembers);
    }
  }

  openAddMemberDialog() {
    // TODO: Implement add member dialog
  }

  openMemberDetailsDialog(member: User) {
    // TODO: Implement member details dialog
  }

  removeMember(member: User) {
    // TODO: Implement remove member confirmation dialog
  }
}
