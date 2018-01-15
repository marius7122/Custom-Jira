import { Injectable } from '@angular/core';
import { task } from './task/task'
import { mockColumns } from './mock/columns'
import { mockTasks } from './mock/task'

@Injectable()
export class DataProviderService{

	constructor() { }

	columnNames = [];
	tasks = [];

	getColumns()
	{
		this.columnNames = mockColumns;
	}

	getTasks()
	{
		this.tasks = mockTasks;
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
			let obj = {title: task.name, description: task.description};
			columns[dict[task.status]].tasks.push(obj);
		}

		return columns;

	}

}
