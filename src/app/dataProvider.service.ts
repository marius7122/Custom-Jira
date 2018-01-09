import { Injectable } from '@angular/core';
import { task } from './task/task'
import { mockTasks } from './task/mockTasks'

@Injectable()
export class DataProviderService{

  constructor() { }


  tasks: task[] = mockTasks;



  getAllTasks(): task[]{


  	console.log("getting data!");
  	return this.tasks;

  }


}
