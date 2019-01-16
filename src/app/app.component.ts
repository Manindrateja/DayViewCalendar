import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { TaskDialog } from './task-dialog';

import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  hours: Array<String> = Array(24);

  tasks: Array<Task> =[];

  constructor(public dialog: MatDialog) {
  	// this.generateTen();
  }

  generateTen(){
  	Array(10).fill(0).forEach(i => this.generateRandomTask());
  }

  generateRandomTask() {

  	let date = new Date();
  	date.setHours(Math.ceil(Math.random() * 23));
  	date.setMinutes(Math.ceil(Math.random() * 60));
  	date.setSeconds(0);

  	let start = date.getTime();
  	let startHour = date.getHours();
  	let startMin = date.getMinutes();
  	let duration = Math.ceil(startMin + Math.random() * (90 - 15) + 15);
  	let end = new Date(date.getTime() + duration * 60000).getTime();

  	let task  = {
  		label: 'task'+ this.tasks.length,
  		start: start,
  		startMin: startMin,
  		startHour: startHour,
  		duration: duration,
  		end: end
  	};

  	this.tasks.push(task);
  	this.sortTasks();
  }

  getTasks(h){
  	let tasks = this.tasks.filter(t => t.startHour === h);
  	return tasks;
  }

  newTask(){
  	let task: Task = {
  		label: '',
  		start: 0,
  		end: 0,
  		startHour: 0,
  		startMin: 0,
  		duration: 0
  	};
  	this.openDialog(task, -1);
  }

  openDialog(task, index): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '50%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if(result && index >= 0){
      	task = result;
      	this.sortTasks();
      }
      	
      if(result && index === -1){
      	this.tasks.push(result);
      	this.sortTasks();
      }
      	
    });
  }

  sortTasks(){
  	this.tasks.sort((a1,b1) => (a1.start > b1.start)?1:-1);
  }

}

