import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { TaskDialog } from './task-dialog';

@NgModule({
  declarations: [
    AppComponent, TaskDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatDialogModule,
    MatButtonModule, MatCheckboxModule
  ],
  entryComponents: [ TaskDialog ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
