import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//imports necessary for angular material
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ShowingPhrasesComponent } from './showing-phrases/showing-phrases.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
  ],entryComponents:[ DialogWindowComponent],
  providers: [],
  declarations: [
    AppComponent,
    ShowingPhrasesComponent,
    DialogWindowComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
