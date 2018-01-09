import { Component, OnInit } from '@angular/core';
import { task } from '../task/task'
import { mockTasks } from '../task/mockTasks'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  columnNumber: number;
  allTasks: task[] = mockTasks;
  myTasks: task[];

  ngOnInit(){
  	
  	
  	
  }

  

}
