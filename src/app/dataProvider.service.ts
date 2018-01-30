import { Injectable } from '@angular/core';
import { task } from './task/task'
import { mockColumns } from './mock/columns'
import { mockTasks } from './mock/task'

import { Issue } from './models/issue';
// import { Http, Response, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';

@Injectable()
export class DataProviderService{

	constructor(private http: HttpClient) {
	}

	columnNames = [];
	tasks = new Array<Issue>();

	APIUrl = 'http://localhost:61411';

	getColumns() 
	{
		this.columnNames = mockColumns;
	}

	getTaskData()
	{
		this.http.get(this.APIUrl + '/issues').subscribe((res:Response) => {
			this.tasks.subscribe = res;
			console.log(res);
		});

		console.log(this.tasks);
	}

	getTasks()
	{
		let tasks =this.getTaskData();
	}

	fillColumns()
	{
		this.getColumns();
		this.getTasks();

		let columns = [];
		let i=0;
		let dict = [];

		//creez coloanele
		for(let column of this.columnNames)
		{
			let obj = {name: column.name, displayName: column.displayName, tasks: []};

			columns.push(obj);

			dict[obj.name] = i;

			i++;
		}

		//adaug taskurile corespunzatoare fiecarei coloane
		for(let task of this.tasks)
		{
			//  	!!!in cazul in care se modifica structura task-ului modifica si aici
			let obj = {title: task.name, description: task.description, owner: task.owner, importance: task.importance};
			columns[dict[task.status]].tasks.push(obj);
		}

		//sortez taskurile fiecarei coloane dupa prioritate
		for(let i in columns)
		{
			columns[i].tasks.sort((t1,t2) => {return t1.importance - t2.importance});
		}

		return columns;

	}

}
