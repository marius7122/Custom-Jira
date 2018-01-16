import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { TaskComponent } from './task/task.component';
import { DataProviderService } from './dataProvider.service';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ColumnsComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
