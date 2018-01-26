import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../dataProvider.service'
import { DragulaService } from 'ng2-dragula/ng2-dragula';

//models
import { Issue } from '../models/issue'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})

export class ColumnsComponent implements OnInit {

  service = new DataProviderService;
  dragula = new DragulaService;
  drake:any;
  
  constructor(dataService: DataProviderService, dragula: DragulaService) { 
    this.service = dataService;
    this.dragula = dragula;

    this.dragula.setOptions('issue-bag',{
      accepts: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
        return this.respectTransactionRules(source.id, target.id);
      }
    });


    this.dragula.dropModel.subscribe((value) => {
      this.onDrop(value);
   });
  }

  columns = [];
  dict = [];

  ngOnInit() {
  	//requesting informations about columns
    this.columns = this.service.fillColumns();

    //creata a dictionary with name of columns -> their index
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

  onDrop(args)
  {
    //args[2] = column where drop event is called
    var id = args[2].id;

    this.sortColumn(id);

    //drag and drop in same column
    if(args[2].id == args[3].id)
    {
      this.dragula.find('issue-bag').drake.cancel(true);
    }
  }

  respectTransactionRules(id1,id2)
  {
    if(id1 == 'open')
    {
      return id2 == 'build' || id2 == 'open';
    }
    if(id1 == 'build')
    {
      return id2 == 'buildUnassigned' || id2 == 'reviewUnassigned' || id2 == 'build';
    }
    if(id1 == 'buildUnassigned')
    {
      return id2 == 'build' || id2 == 'buildUnassigned';
    }
    if(id1 == 'reviewUnassigned')
    {
      return id2 == 'review' || id2 == 'reviewUnassigned';
    }
    if(id1 == 'review')
    {
      return id2 == 'testUnassigned' || id2 == 'build' || id2 == 'buildUnassigned' || id2 == 'review';
    }
    if(id1 == 'testUnassigned')
    {
      return id2 == 'test' || id2 == 'testUnassigned';
    }
    if(id1 == 'test')
    {
      return  id2 == 'verify' || id2 == 'buildUnassigned' || id2 == 'build' || 
              id2 == 'test' || id2 == 'testUnassigned' || id2 == 'review' || id2 == 'reviewUnassigned';
    }
    if(id1 == 'verify')
    {
      return id2 == 'test' || id2 == 'testUnassigned' || id2 == 'done' || id2 == 'verify';
    }
  }
}
