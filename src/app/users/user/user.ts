import { Country } from '../country';
import { Task } from './task';

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public country: Country,
        public gender: string,
        public password: string,
        public subscribe: boolean,
        public tasks: Task[],
        public id?: string
    ) {}
}
