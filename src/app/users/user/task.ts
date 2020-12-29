export class Task {
    constructor(
        public title: string,
        public description: string,
        public resolved: boolean,
        public date?: string,
        public id?: string
    ) {}
}
