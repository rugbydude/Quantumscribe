import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../../models/task.model';
import { AppState } from '../../store/app.state';
import * as TaskActions from '../../store/task/task.actions';
import * as TaskSelectors from '../../store/task/task.selectors';

@Component({
  selector: 'app-task-board',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Task Board</h2>
        <button mat-raised-button color="primary" (click)="openCreateTaskDialog()">
          Add Task
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Todo Column -->
        <div class="task-column">
          <h3 class="text-lg font-semibold mb-4">To Do</h3>
          <div
            cdkDropList
            #todoList="cdkDropList"
            id="todoList"
            [cdkDropListData]="todoTasks"
            [cdkDropListConnectedTo]="[inProgressList, doneList]"
            (cdkDropListDropped)="drop($event)"
            class="task-list"
          >
            <mat-card
              *ngFor="let task of todoTasks"
              cdkDrag
              class="task-card mb-2"
            >
              <mat-card-header>
                <mat-card-title>{{ task.title }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{ task.description }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- Similar columns for In Progress and Done -->
      </div>
    </div>
  `,
  styles: [`
    .task-column {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 0.5rem;
    }
    .task-list {
      min-height: 400px;
    }
    .task-card {
      cursor: move;
    }
  `]
})
export class TaskBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(TaskSelectors.selectTasksByStatus).subscribe(tasks => {
      this.todoTasks = tasks[TaskStatus.TODO] || [];
      this.inProgressTasks = tasks[TaskStatus.IN_PROGRESS] || [];
      this.doneTasks = tasks[TaskStatus.DONE] || [];
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const task = event.container.data[event.currentIndex];
      const newStatus = this.getStatusFromContainer(event.container.id);
      
      this.store.dispatch(TaskActions.updateTaskStatus({
        taskId: task.id,
        status: newStatus
      }));
    }
  }

  private getStatusFromContainer(containerId: string): TaskStatus {
    switch (containerId) {
      case 'todoList': return TaskStatus.TODO;
      case 'inProgressList': return TaskStatus.IN_PROGRESS;
      case 'doneList': return TaskStatus.DONE;
      default: return TaskStatus.TODO;
    }
  }

  openCreateTaskDialog() {
    // TODO: Implement task creation dialog
  }
}
