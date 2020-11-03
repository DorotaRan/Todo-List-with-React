import React from 'react';
import Button from '../../UI/Button/Button';
import Checkbox from '../../UI/Checkbox/Checkbox';
import './TodoList.css';

function TodoList({todos, onTodoDelete, onTodoEdit, onTodoToggle}) {
  return (
    <section className="todo-aside"> 
      <h2>List of tasks:</h2>
      {todos
      .sort((a,b) => b.priority - a.priority)
      .map(todo => {
        let todoClassName = "todo";

        if(todo.priority === "2") {
          todoClassName += " todo-prior-medium";
          console.log(todo.priority)
        } else if(todo.priority === "3") {
          todoClassName += " todo-prior-high";
          console.log(todo.priority)
        }
        if(!todo.extra) {
          todoClassName +=  " todo-done";
        }

        return (
          <div className="todo" key={todo.id}>
            <div className="todo-list-section">
              <h3>Title:{todo.title}</h3>
              <p>Desc: {todo.description}</p>
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
                callbackFn={() => {onTodoEdit(todo)}}
                variant="edit"
                size={1}
              />
              <Checkbox 
                type="checkbox" 
                className="checkbox" 
                callbackFn={() => onTodoToggle(todo)}
              /> 
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default TodoList;


