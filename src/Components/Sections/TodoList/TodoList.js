import React from 'react';
import Button from '../../UI/Button/Button';
import './TodoList.css';

function TodoList({todos, onTodoDelete}) {
  return (
    <section className="todo-aside"> 
      <h2>List of tasks:</h2>
      {todos.map(todo => {
        let todoClassName = " todo"
        if (todo.priority === 1) {
          todoClassName = todoClassName + " todo-prior-medium";
        } else if (todo.priority === 2) {
          todoClassName = todoClassName + " todo-prior-high";
        }
        return (
          <div className={todoClassName} key={todo.id}>
            <div>
              <h3>Title: {todo.title}</h3>
              <p>Description: {todo.description}</p>
              <p>Author: {todo.author}</p>
              <p>URL: {todo.url}</p>
            </div>
            <div className="delete-edit-btn-section">
              <Button
                label="Delete"
                callbackFn={() => {onTodoDelete(todo.id)}}
                variant="delete"
                size={1}
              />
              <Button
                label="Edit"
                // callbackFn={() => {onTodoDelete(todo.id)}}
                variant="edit"
                size={1}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default TodoList;


