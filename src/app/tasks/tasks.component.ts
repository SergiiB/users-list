import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../users/user/task';
import { PopupDeleteTaskComponent } from './popup-delete-task/popup-delete-task.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskFormComponent } from './update-task-form/update-task-form.component';
import { User } from '../users/user/user';
import { UserService } from '../users/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    public user: User;
    public tasksList: Task[] = [];
    public usersList: User[] = [];

    constructor(
        public userService: UserService,
        public taskService: TaskService,
        public dialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        debugger
        this.taskService.getTasksList().subscribe((tasks: Task[]) => {
            this.tasksList = tasks;
        });
        this.userService.getUsersList().subscribe((users: User[]) => {
            this.usersList = users;
        });
    }

    deleteTask(task: Task, event: MouseEvent): void {
        debugger;
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this.dialog.open(PopupDeleteTaskComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.taskService.deleteTask(task.id).subscribe(
                    () => {
                        this.tasksList = this.tasksList.filter((item) => item.id !== task.id);
                    },
                    () => {}
                );
            }
        });
    }

    editTask(task: Task, event: MouseEvent): void {
        debugger;

        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this.dialog.open(UpdateTaskFormComponent, { data: { id: this.user.id } });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Result edit task: ', result);
            // if (result) {
            //     this.taskService.updateTask(task.id).subscribe(() => {
            //         this.tasksList = this.tasksList.filter(item => item.id !== task.id);
            //     }, () => {});
            // }
        });
    }
}
