import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Task } from './models';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.html',
  styleUrls: ['./task-dialog.scss'],
})
export class TaskDialog implements OnInit {

	taskForm: FormGroup;
	task: any; 
	always: string = 'always';

	constructor(
	public dialogRef: MatDialogRef<TaskDialog>,
	@Inject(MAT_DIALOG_DATA) public data: Task, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
		this.task = data;
		if(data.start){
			let start = new Date(data.start);
			this.task.startTime = this.get2digits(start.getHours())+ ':' + this.get2digits(start.getMinutes());	
		}
		if(data.end){
			let end = new Date(data.end);
			this.task.endTime = this.get2digits(end.getHours())+ ':' + this.get2digits(end.getMinutes());
		}
	}

	ngOnInit(){
		this.taskForm = this.formBuilder.group({
            label: new FormControl(this.task.label,[ Validators.required]),
            startTime: new FormControl(this.task.startTime,[ Validators.required]),
            endTime: new FormControl(this.task.endTime,[ Validators.required, this.checkTime])
        });
	}

	get2digits(num){
		return (num < 10) ? '0'+ num : num;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	saveTask(){

		//validate start and end time
		if(this.taskForm.value.startTime > this.taskForm.value.endTime){
			this.snackBar.open('End Time must be greater than start time', '', {
		      duration: 2000,
		    });
		    return;
		}

		let [hours, mins] = this.taskForm.value.startTime.split(':').map(n => Number(n));
		let date = new Date(this.task.start);
		date.setHours(hours);
		date.setMinutes(mins);
		this.task.start = date.getTime();
		this.task.startHour = hours;
		this.task.startMin = mins;

		[hours, mins] = this.taskForm.value.endTime.split(':').map(n => Number(n));;
		date = new Date(this.task.end);
		date.setHours(hours);
		date.setMinutes(mins);
		this.task.end = date.getTime();

		this.task.duration = Math.abs(Math.ceil((this.task.end - this.task.start) / 60000));

		this.task.label = this.taskForm.value.label;

		this.dialogRef.close(this.task);

	}

	checkTime(control : AbstractControl) : {[s:string ]: boolean} {
		const group = control.parent;
		if (group) {
			if(group.controls['startTime'].value > group.controls['endTime'].value)
				return {
					valid: false
				};
		}
		return null;
	}
}
