import { Component, OnInit } from '@angular/core';
import { Titles } from './column-names';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})

export class ColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  titles:string[] = Titles;

}
