import { ProjectState } from './project/project.reducer';
import { TaskState } from './task/task.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  projects: ProjectState;
  tasks: TaskState;
  user: UserState;
}
