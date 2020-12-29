import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country';
import { Task } from './user/task';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public constructor(private http: HttpClient) {}

    public getUsersList(): Observable<User[]> {
        return this.http.get('http://localhost:5000/users').pipe(
            map((data: User[]) => {
                return data.map((user: User) => {
                    return new User(
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.phone,
                        new Country(user.country.name, user.country.flag),
                        user.gender,
                        user.password,
                        user.subscribe,
                        user.tasks.map((task: Task) => {
                            return new Task(
                                task.title,
                                task.description,
                                task.date
                            );
                        }),
                        user.id
                    );
                });
            })
        );
    }

    public getUserById(id: string): Observable<User> {
        return this.http.get(`http://localhost:5000/users/${id}`).pipe(
            map((data: User) => {
                return new User(
                    data.firstName,
                    data.lastName,
                    data.email,
                    data.phone,
                    new Country(data.country.name, data.country.flag),
                    data.gender,
                    data.password,
                    data.subscribe,
                    data.tasks.map((task: Task) => {
                        return new Task(
                            task.title,
                            task.description,
                            task.date
                        );
                    }),
                    data.id,
                );
            })
        );
    }

    public addUser(user: User): Observable<User> {
        return this.http.post(`http://localhost:5000/user`, user).pipe(
            map((data: User) => {
                return new User(
                    data.firstName,
                    data.lastName,
                    data.email,
                    data.phone,
                    new Country(data.country.name, data.country.flag),
                    data.gender,
                    data.password,
                    data.subscribe,
                    data.tasks.map((task: Task) => {
                        return new Task(
                            task.title,
                            task.description,
                            task.date
                        );
                    }),
                    data.id,
                );
            })
        );
    }

    public deleteUser(id: string): Observable<{}> {
        const url = `http://localhost:5000/users/${id}`;

        return this.http.delete(url);
    }

    public updateUser(user: User): Observable<any> {
        return this.http.put(`http://localhost:5000/user`, user);
    }

    // public updateUser(user: User, id: string): Observable<User> {
    //     return this.http.put(`http://localhost:5000/users/${id}`, user).pipe(
    //         map((data: User) => {
    //             return new User(
    //                 data.firstName,
    //                 data.lastName,
    //                 data.email,
    //                 data.phone,
    //                 new Country(data.country.name, data.country.flag),
    //                 data.gender,
    //                 data.password,
    //                 data.subscribe,
    //                 data.tasks.map((task: Task) => {
    //                     return new Task(
    //                         task.title,
    //                         task.description,
    //                         task.date
    //                     );
    //                 }),
    //                 data.id,
    //             );
    //         })
    //     );
    // }
}
