import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-popup-delete-task',
    templateUrl: './popup-delete-task.component.html',
    styleUrls: ['./popup-delete-task.component.scss']
})
export class PopupDeleteTaskComponent implements OnInit {

    @Output() confirm = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}
}
