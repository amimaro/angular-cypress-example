import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private todos$: Observable<Todo[]>;
  private filter$: Observable<string>;
  public filter: FormControl;
  public filteredTodos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredTodos$ = combineLatest([this.todos$, this.filter$]).pipe(
      map(([todos, filterString]) =>
        todos.filter(
          (todo) =>
            todo.title.toLowerCase().indexOf(filterString.toLowerCase()) !==
              -1 && todo.userId === 1
        )
      )
    );
  }

  ngOnInit(): void {}
}
