import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatDialog }  from '@angular/material/dialog';
import { ToDo } from '../api.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tabs = [
    "All",
    "Done",
    "Not Done"
  ]
  todoList: Array<ToDo> = [];
  updateTodoForm = this.formBuilder.group({
    title: '',
    detail: '',
    is_done: false,
  })
  selectedToDo: ToDo|null = null;
  searchParams = {};

  constructor(
    private api: ApiService,
    private cookie: CookieService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.cookie.check('is_login')) {
      this.router.navigate(['account', 'login']);
    }
    this.refresh();
  }

  refresh() {
    this.api.getToDoList(this.searchParams).subscribe(result => { this.todoList = result }) ;
    this.selectedToDo = null;
  }

  switchTab(event: MatTabChangeEvent) {
    let tab = event.tab.textLabel;
    switch (tab) {
      case 'Done':
        this.searchParams = {'is_done': true};
        break;
      case 'Not Done':
        this.searchParams = {'is_done': false};
        break;
      default:
        this.searchParams = {};
    }
    this.refresh();
  }
  openFormDialog() {
    let dialog = this.dialog.open(TodoFormComponent, {
      width: '500px'
    })

    dialog.afterClosed().subscribe(
      result => {
        if (result.status == 'created') {
          this.api.getToDoList(this.searchParams).subscribe(result => { this.todoList = result }) ;
        }
      }
    )
  }

  updateSelected(todo: ToDo) {
    this.selectedToDo = todo;
    this.updateTodoForm = this.formBuilder.group({
      title: todo.title,
      detail: todo.detail,
      is_done: todo.is_done
    })
  }

  markAsDone(list: any) {
    let ids = []
    for(let selected of list.selectedOptions.selected) {
      ids.push(selected.value)
    }
    this.api.markDone(ids).subscribe(
      () => {this.refresh()}
      );
  }

  updateToDo(todo: ToDo) {
    this.api.updateToDo(todo.id, this.updateTodoForm).subscribe(
      result => {
        this.notifier.notify("success", "ToDo updated successfully!");
        this.refresh();
      }
    );
  }

}
