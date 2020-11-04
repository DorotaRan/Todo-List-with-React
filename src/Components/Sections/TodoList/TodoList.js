import React from 'react';
import Button from '../../UI/Button/Button';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TodoList.css';


function TodoList({todos, onTodoDelete, onTodoEdit, onTodoToggle}) {
  return (
    <section className='todo-aside'> 
      <h2>List of tasks:</h2>
      {todos
      .sort((a,b) => b.priority - a.priority)
      .map(todo => {
        let todoClassName = 'todo';
        console.log(todo.extra)
        if (todo.extra) {
          todoClassName = todoClassName + ' todo-done';
        }

        if (todo.priority === 1) {
          todoClassName = todoClassName + ' todo-prior-medium';
        } else if (todo.priority === 3) {
          todoClassName = todoClassName + ' todo-prior-high';
        } 
       

        return (
          <div className={todoClassName} key={todo.id}>
            <div className='todo-list-section'>
              <h3>Title:  {todo.title}</h3>
              <p>Desc:  {todo.description}</p>
              <p>Author:  {todo.author}</p>
              <p>URL:  {todo.url}</p>
            </div>
            <div className='delete-edit-btn-section'>
              <Button
                label={ <FontAwesomeIcon icon={faTrashAlt} /> } 
                callbackFn={ () => {onTodoDelete(todo.id)} }
                variant='delete'
              />
              <Button
                label={ <FontAwesomeIcon icon={faEdit} /> } 
                callbackFn={ () => {onTodoEdit(todo)} }
                variant='edit'
              />
              <Button
                label={ <FontAwesomeIcon icon={faCheck} /> } 
                type='check' 
                className='check' 
                variant='check'
                callbackFn={() => {onTodoToggle(todo)}}
              /> 
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default TodoList;


