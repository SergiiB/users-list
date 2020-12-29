import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    tasksList = [
        {
            title: 'Create form',
            description: 'Create reactive form on Angular'
        },
        {
            title: 'To consolidate theoretical knowledge',
            description: 'Understand what reactive forms are, what they are for and how they work'
        }
    ];

    constructor() {}

    getTasksList(): any {
        return this.tasksList;
    }
}
