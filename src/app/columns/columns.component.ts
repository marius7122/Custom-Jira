import { Component, OnInit, Injectable } from '@angular/core';
// import { DataProviderService } from '../dataProvider.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

//models
import { Issue } from '../models/issue';
import { Column } from '../models/column';

import { DataProviderService } from '../dataProvider.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
  providers: [ DataProviderService ]
})

export class ColumnsComponent implements OnInit {
  
  constructor(private dataService:DataProviderService, private dragula: DragulaService) { 
    //this.dragula = dragula;

    dragula.setOptions('issue-bag',{
      accepts: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
        if(this.respectTransactionRules(source.id, target.id))
        {
          return true;
        }
        return false;
      }
    });

    dragula.dropModel.subscribe((value) => {
      this.onDrop(value);
   });

    dragula.drop.subscribe((args) => {
      
    });
  }

  issues = Array<Issue>();
  columns = Array<Column>(9);
  dict = [];
  statusToColumn = [];

  ngOnInit() {
    //requesting informations about columns
    this.readColumns();
  }

  readColumns()
  {
    for(let i=0;i<9;i++)
    {
      this.columns[i] = new Column();
      this.columns[i].name = '';
      this.columns[i].tasks = new Array<Issue>();
    }

    let names = this.dataService.getColumnNames();
    this.setColumnNames(names);
    let allTasksPromise = this.dataService.getAllTasks();

    allTasksPromise.then((data) => {
      this.putTasksInColumns(data as Issue[]);
      this.sortAllColumns();
    });
    
  }

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

  createStatusToColumn()
  {
    this.statusToColumn[' Open '] = 'open';
    this.statusToColumn[' Ready for review '] = 'reviewUnassigned';
    this.statusToColumn[' Review '] = 'review';
    this.statusToColumn[' Item Test '] = 'test';
    this.statusToColumn[' Build '] = 'build';
    this.statusToColumn[' Verify '] = 'verify';
  }
  setColumnNames(names)
  {
    //seting the column names
    let i = 0;
    for (let name of names)
    {
      this.columns[i].displayName = name.displayName;
      this.columns[i].name = name.name;
      i++;
    }
    
    //creata a dictionary with name of columns -> their index
    for (let i in this.columns)
    {
      this.dict[this.columns[i].name] = i;
    }
  }
  putTasksInColumns(tasks:Issue[])
  {
    this.issues = tasks;

    console.log(this.issues);

    let i;
    for(let task of tasks)
    {
      if(task.Importance === undefined)
        task.Importance = this.randomInt(1,4);


      if(task.Importance == 0)
        task.Importance = 5;

      i = this.dict[task.Status];
      this.columns[i].tasks.push(task);
    }
  }
  sortAllColumns()
  {
    console.log(this.columns);
    for(let column of this.columns)
      this.sortColumn(column.name);
  }

  sortColumn(id)
  {
    let index = this.dict[id];
    this.columns[index].tasks.sort((t1,t2) => {return t1.Importance - t2.Importance});
  }

  onDrop(args)
  {
    const [bagName, elSource, bagTarget, bagSource, elTarget] = args;

    //args[2] = column where drop event is called
    var columnId = args[2].id;

    //id of the element that was moved
    var elementId = elSource.children[0].id;

    //TO DO!!!
    //send request to api to update element

    this.sortColumn(columnId);

    //drag and drop in same column
    if(args[2].id == args[3].id)
    {
      this.dragula.find('issue-bag').drake.cancel(true);
    }
  }

  onDropModel(args: any): void {
    let [el, target, source] = args;
    let index = this.getElementIndex(el);
  }

  respectTransactionRules(id1,id2)
  {
    if(id1 == 'open')
    {
      return (id2 == 'build' || id2 == 'open');
    }
    if(id1 == 'build')
    {
      return (id2 == 'buildUnassigned' || id2 == 'reviewUnassigned' || id2 == 'build');
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
      return id2 == 'testUnassigned' || id2 == 'build' || id2 == 'buildUnassigned' || id2 == 'review' || id2 == 'reviewUnassigned';
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

  getElementIndex(el) {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }
}
