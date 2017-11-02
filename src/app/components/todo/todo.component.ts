import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todos: any[];
  temp: any;
  choice: number;
  constructor() {
    this.todos = [
      {
        title: '吃饭',
        compelted: false
      },
      {
        title: '睡觉',
        compelted: true
      },
      {
        title: '打豆豆',
        compelted: true
      }];
    this.choice = 1;
  }

  ngOnInit() { }
  removeTodo(index): void {
    // if (this.todos[index].compelted) {
    //   this.todos[index].compelted = false;
    // } else {
    //   this.todos[index].compelted = true;
    // }
    // this.todos.splice(index, 1);
  }
  addTodo(value): void {
    this.temp = {
      title: value,
      compelted: true
    };
    this.todos.push(this.temp);
  }
  nextChoice(): void {
    this.choice++;
    if (this.choice > 3) {
      this.choice = 1;
    }
  }
}
