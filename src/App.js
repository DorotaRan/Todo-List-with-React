import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo } from './Requests';
import './App.css';
import TodoList from './Components/Sections/TodoList/TodoList';
import TodoCreation from './Components/Sections/TodoCreation/TodoCreation';

function App() {
  const [todos, updateTodos] = useState([]);
  const [error, setRequestError]= useState(false);

  useEffect(() => {
    getAndRenderTodos()
  }, [])

  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data)
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const onTodoDelete = id => {
    deleteTodo(id).then(() => {
      getAndRenderTodos();
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const addNewTask = todo => {
    addTodo(todo).then(() => {
      getAndRenderTodos();
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  return (
    <main>
      <h1>Todo List</h1>
      <div className="container">
        { error && <p>I  was not able to download the data this time. Please try again later.</p> }
        { !error && (
          <>
            <TodoCreation addNewTask={addNewTask}></TodoCreation>
            <TodoList todos={todos} onTodoDelete={onTodoDelete}></TodoList>
          </>
        )}
      </div>
    </main>
  )
}

export default App;