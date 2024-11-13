import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';

import { projectReducer } from './store/project/project.reducer';
// TODO: Create task reducer
// import { taskReducer } from './store/task/task.reducer';
import { ProjectEffects } from './store/project/project.effects';
// TODO: Create task effects
// import { TaskEffects } from './store/task/task.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectListComponent,
    TaskBoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule, 
    DragDropModule,
    StoreModule.forRoot({
      projects: projectReducer,
      // TODO: Add task reducer after creation
      // tasks: taskReducer,
    }),
    EffectsModule.forRoot([
      ProjectEffects,
      // TODO: Add TaskEffects after creation
      // TaskEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
