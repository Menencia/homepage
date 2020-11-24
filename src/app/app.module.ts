import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatusPipe } from './status.pipe';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/firebase';

@NgModule({
  declarations: [
    AppComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
