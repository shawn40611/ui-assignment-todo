import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    TodoComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatTabsModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule
  ]
})
export class TodoModule { }
