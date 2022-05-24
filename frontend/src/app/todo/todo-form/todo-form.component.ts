import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-todo-form', 
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit{
  todoForm = this.formBuilder.group({
    title: '',
    detail: '',
  });
  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private notifier: NotifierService
  ) { }
  
  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close({
      'status': 'canceled'
    });
  }

  onSubmit() {
    this.api.createToDo(this.todoForm.value).subscribe(
      () => {
        this.notifier.notify("success", "A new todo have already created!")
        this.dialogRef.close({
          'status': 'created'
        })
      },
      (error: Error) => { console.log(error)}
    );
  }

}
