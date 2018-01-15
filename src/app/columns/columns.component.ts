import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../dataProvider.service'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})

export class ColumnsComponent implements OnInit {
	service = new DataProviderService;	

  constructor(dataService: DataProviderService) { 
  	this.service = dataService;
  }

  columns = [];

  ngOnInit() {
  	//cer informatiile despre coloane
    this.columns = this.service.fillColumns();
    console.log(this.columns);
  }

}
