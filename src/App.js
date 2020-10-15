import React, { useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from './Requests'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  const [todos, updateTodos] = useState([]);
  const [newInputValue, setNewInputValue] = useState('');
  const [newInputDesc, setNewInputDesc] = useState('');

  useEffect(() => {
    getAndRenderTodos()
  }, [])
  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data);
    });
  }
  const onDelete = (id) => {
    deleteTodo(id)
    getAndRenderTodos()
  }
  const addNewTask = (event) => {
    event.preventDefault();
    addTodo({
      title: newInputValue,
      description: newInputDesc
    }).then(() => {
      getAndRenderTodos()
    })
  }
  return (
    <main>
      <div className="container">
        <h1> Create a task</h1>
        <form>
          <label forhtml ="taskTitle">Provide a task name </label>
          <input onChange ={(event) => { setNewInputValue(event.target.value)}}type="text" id="taskTitle" />
          <label forhtml ="taskDesc">Provide a task description </label>
          <input onChange  ={(event) => { setNewInputDesc(event.target.value)}}type="text" id="taskDesc" />
          <button onClick={addNewTask} type="submit">ADD</button>
        </form>

        <h1> List of tasks</h1>
        {todos.map(todo => {
          return (
          <div className="todo" key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button onClick={() => {onDelete(todo.id) }} className="btn btn-danger">DELETE</button>
          </div>
          ) 
        }
        )}
      </div>
    </main>
  );
}

export default App;
