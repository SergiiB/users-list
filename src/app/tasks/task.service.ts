import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/user/user';
import { map } from 'rxjs/operators';
import { Task } from '../users/user/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    Task = [
        { title: 'Create form', description: 'Create reactive form on Angular' },
        {
            title: 'To consolidate theoretical knowledge',
            description: 'Understand what reactive forms are, what they are for and how they work'
        }
    ];

    // resolved = false;

    constructor(private http: HttpClient) {}

    public getTasksList(): Observable<Task[]> {
        return this.http.get('http://localhost:5000/users').pipe(
            map((data: User[]) => {
                let result = [];
                data.forEach((user: User) => {
                    debugger
                    const newTasksArray = user.tasks.map((task: Task) => {
                        return new Task(task.title, task.description, task.resolved, task.date, task.id);
                    });

                    const tmpConcatArray = result.concat(newTasksArray);

                    result = tmpConcatArray;
                });

                return result;
            })
        );
    }

    public getTasksByUserId(id: string): Observable<Task> {
        return this.http.get(`http://localhost:5000/users/${id}`).pipe(
            map((task: Task) => {
                return new Task(task.title, task.description, task.resolved, task.date, task.id);
            })
        );
    }

    public addTask(newTask: Task, id: string): Observable<Task> {
        return this.http.post(`http://localhost:5000/user/add-task`, { task: newTask, userId: id }).pipe(
            map((data: Task) => {
                return new Task(data.title, data.description, data.resolved, data.date, data.id);
            })
        );
    }

    public deleteTask(id: string): Observable<{}> {
        const url = `http://localhost:5000/user/tasks/${id}`;

        return this.http.delete(url);
    }

    public updateTask(task: Task, id: string): Observable<Task> {
        debugger
        return this.http.put(`http://localhost:5000/user/tasks/${id}`, { task, userId: id }).pipe(
            map((data: Task) => {
                return new Task(data.title, data.description, data.resolved, data.date, data.id);
            })
        );
    }

    public resolvedTask(id: string): Observable<Task> {
        const url = `http://localhost:5000/user/tasks/${id}`;

        return this.http.put<Task>(url, {resolved: true}).pipe(
            map((data: Task) => {
                return new Task(data.title, data.description, data.resolved, data.date, data.id);
            })
        );
    }
}
