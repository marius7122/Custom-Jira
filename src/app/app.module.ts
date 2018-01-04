import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { ColumnComponent } from './column/column.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ColumnsComponent,
    ColumnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
