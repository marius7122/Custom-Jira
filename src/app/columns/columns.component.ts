import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../dataProvider.service'
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})

export class ColumnsComponent implements OnInit {
	service = new DataProviderService;	

  constructor(dataService: DataProviderService, dragula: DragulaService) { 
    this.service = dataService;

    dragula.drop.subscribe((value) => {
      this.onDrop(value);
    });
  }

  columns = [];
  dict = [];

  ngOnInit() {
  	//cer informatiile despre coloane
    this.columns = this.service.fillColumns();

    //fac un dictionar cu numele coloanelor -> indexul lor
    for (let i in this.columns)
    {
      this.dict[this.columns[i].name] = i;
    }


    console.log(this.columns);
  }


  onDrop(args){
    //imi trebuie args[2]
    //args[2] = coloana unde s-a facut drag
    let id = args[2].id;
    let idIndex = this.dict[id];

    console.log(this.columns[idIndex]);

    //sortez taskurile
    this.columns[idIndex].tasks.sort((t1,t2) => {return t1.importance - t2.importance});

  }



}
