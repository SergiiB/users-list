import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './task';
import {AddTaskFormComponent} from './add-task-form/add-task-form.component';
import {PopupDeleteTaskComponent} from '../../tasks/popup-delete-task/popup-delete-task.component';
import {TaskService} from '../../tasks/task.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: User;
    public tasksList: Task[] = [];

    constructor(public route: ActivatedRoute, public userService: UserService, public dialog: MatDialog, public taskService: TaskService) {}

    public ngOnInit(): void {
        this.getUser();
    }

    public getUser(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.userService.getUserById(id).subscribe((user) => (this.user = user));
    }

    deleteTask(task: Task, event: MouseEvent): void {
        console.log(task);
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this.dialog.open(PopupDeleteTaskComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(task.id).subscribe(() => {
                    this.tasksList = this.tasksList.filter(item => item.id !== task.id);
                }, () => {});
            }
        });
    }

    addTask(user: User, event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();

        const dialogRef = this.dialog.open(AddTaskFormComponent, { data: { id: user.id } });

        dialogRef.afterClosed().subscribe((newTask: Task) => {
            if (newTask) {
                this.user.tasks.push(newTask);
            }
        });
    }

    resolvedTask(id: string, event: MouseEvent): void {
        console.log(id);
        event.stopPropagation();
        event.preventDefault();
        this.taskService.resolvedTask(id).subscribe(task => {
            console.log(task);
            this.tasksList.find(taskResolved => taskResolved.id === task.id).resolved = true;
        });
    }
}
