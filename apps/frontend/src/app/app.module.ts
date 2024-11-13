import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { taskReducer } from './store/task/task.reducer';
import { TaskEffects } from './store/task/task.effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule,
        StoreModule.forRoot({
            tasks: taskReducer
        }),
        EffectsModule.forRoot([
            TaskEffects
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
