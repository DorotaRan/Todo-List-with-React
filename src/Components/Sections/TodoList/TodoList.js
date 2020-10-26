import React from 'react';
import Button from '../../UI/Button/Button';
import './TodoList.css';

function TodoList({todos, onTodoDelete}) {
  return (
    <section className="todo-side"> 
      <h2>List of tasks:</h2>
      {todos.map(todo => {
        let todoClassName;
        if (todo.priority === 0 ) {
          todoClassName = " todo"
        } else if (todo.priority === 1) {
          todoClassName = "todo  +  medium-priority";
        } else if (todo.priority === 2) {
          todoClassName = "todo +  high-priority";
        }
        return (
          <div className={todoClassName} key={todo.id}>
            <h3>Title: {todo.title}</h3>
            <p>Description: {todo.description}</p>
            <p>Author: {todo.author}</p>
            <p>URL: {todo.url}</p>
            <Button
              label="Delete"
              callbackFn={() => {onTodoDelete(todo.id)}}
              variant="delete"
            />
          </div>
        )
      })}
    </section>
  )
}

export default TodoList;


