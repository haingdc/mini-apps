import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MockDataSourceService } from './mock';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MockDataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
