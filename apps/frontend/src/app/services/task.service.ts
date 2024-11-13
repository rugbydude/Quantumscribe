import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = `${environment.apiUrl}/tasks`;

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    updateTaskStatus(taskId: string, status: TaskStatus): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/${taskId}/status`, { status });
    }

    createTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    deleteTask(taskId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
    }
}
