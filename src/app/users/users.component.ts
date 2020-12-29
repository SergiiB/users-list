import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { User } from './user/user';
import { AddTaskFormComponent } from './user/add-task-form/add-task-form.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    public visibleForm = false;
    public usersList: User[] = [];

    // ########################################

    constructor(public usersService: UserService, public dialog: MatDialog, private router: Router) {}

    // ########################################

    public ngOnInit(): void {
        this.usersService.getUsersList().subscribe((users: User[]) => {
            this.usersList = users;
        });
    }

    // ########################################

    toggleVisibleForm(): void {
        this.visibleForm = !this.visibleForm;
    }

    // ########################################

    // Add a new user
    responseUser(newUser: User): void {
        if (newUser) {
            this.usersList.push(newUser);
        }
    }

    // ########################################

    delete(user: User, event: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this.dialog.open(DeleteUserComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.usersService.deleteUser(user.id).subscribe(
                    () => {
                        this.usersList = this.usersList.filter((item) => item.id !== user.id);
                    },
                    () => {}
                );
            }
        });
    }

    addTask(user: User, event: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this.dialog.open(AddTaskFormComponent, { data: { id: user.id } });

        dialogRef.afterClosed().subscribe((data) => {
            console.log('Метод добавления таски: ', data);
            this.router.navigate(['/users', user.id]);
        });
    }
}
