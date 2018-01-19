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
  dragula = new DragulaService;

  constructor(dataService: DataProviderService, dragula: DragulaService) { 
    this.service = dataService;
    this.dragula = dragula;

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

      this.columns[i].bagName = this.columns[i].name + "-bag";
    }


    console.log(this.columns);
  }

  sortColumn(id)
  {
    let index = this.dict[id];

    this.columns[index].tasks.sort((t1,t2) => {return t1.importance - t2.importance});
  }

  onDrop(args){

    if(args[2].id == args[3].id)
    {
      let id = args[2].id;

      this.sortColumn(id);

      this.dragula.find('issue-bag').drake.cancel(true);
    }
    else
    {
      //imi trebuie args[2]
      //args[2] = coloana unde s-a facut drag
      let id = args[2].id;

      //sortez taskurile
      this.sortColumn(id);
    }
  }

}
