import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { TaskComponent } from './task/task.component';
import { DataProviderService } from './dataProvider.service';
import { DragulaModule } from 'ng2-dragula';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ColumnsComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
