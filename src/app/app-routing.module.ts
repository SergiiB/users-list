import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './users/user/user.component';
import { UpdateUserFormComponent } from './users/update-user-form/update-user-form.component';

const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'user-update/:id', component: UpdateUserFormComponent },
    { path: 'users/:id', component: UserComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
