import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../../users/user/task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-task-form',
    templateUrl: './update-task-form.component.html',
    styleUrls: ['./update-task-form.component.scss']
})
export class UpdateTaskFormComponent implements OnInit {
    public taskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', [Validators.required, Validators.minLength(3)]),
        date: new FormControl('')
    });

    constructor(
        private matDialogRef: MatDialogRef<UpdateTaskFormComponent>,
        private taskService: TaskService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    ngOnInit(): void {
        this.taskForm.patchValue(this.data.editTask);
    }

    public onSave(): void {
        console.log(this.data.id);
        if (this.taskForm.valid) {
            let task: Task = new Task(
                this.taskForm.get('title').value,
                this.taskForm.get('description').value,
                this.taskForm.get('date').value
            );

            this.taskService.updateTask(task, this.data.id).subscribe((editTask: Task) => {
                task = editTask;
                this.router.navigate(['/tasks']);
                // this.matDialogRef.close(editTask);
            });
        }
    }
}
