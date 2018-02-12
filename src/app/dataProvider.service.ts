import { Injectable } from '@angular/core';
import { task } from './task/task'
import { mockColumns } from './mock/columns'
import { mockTasks } from './mock/task'

import { Issue } from './models/issue';

import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';

import { promise } from 'selenium-webdriver';

@Injectable()
export class DataProviderService{

	constructor(private http: HttpClient) {
	}

	columnNames = [];
	tasks = Array<Issue>();

	APIUrl = 'http://localhost:61411';

	getColumnNames()
	{
		return mockColumns;
	}

	getAllTasks()
	{
		return this.http.get(this.APIUrl + '/issues').toPromise();
	}

	updateTaskInformation(task:Issue)
	{
		let body = JSON.stringify(task);

		return this.http.put(this.APIUrl + "/update", task).toPromise();
	}
}
