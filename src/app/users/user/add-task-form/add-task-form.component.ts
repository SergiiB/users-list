import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../../../tasks/task.service';
import { Task } from '../task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-task-form',
    templateUrl: './add-task-form.component.html',
    styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent {
    public taskForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        date: new FormControl('')
    });

    constructor(
        private matDialogRef: MatDialogRef<AddTaskFormComponent>,
        private taskService: TaskService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    public onAdd(): void {
        console.log(this.data);
        if (this.taskForm.valid) {
            const task: Task = new Task(
                this.taskForm.get('title').value,
                this.taskForm.get('description').value,
                this.taskForm.get('date').value
            );

            this.taskService.addTask(task, this.data.id).subscribe((newTask: Task) => {
                this.matDialogRef.close(newTask);
            });
        }
    }
}
