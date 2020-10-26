import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo } from './Requests';
import './App.css';
import TodoList from './Components/Sections/TodoList/TodoList';
import TodoCreation from './Components/Sections/TodoCreation/TodoCreation';

function App() {
  const [todos, updateTodos] = useState([]);
  const [didRequestFail, setRequestStatus]= useState([false]);

  useEffect(() => {
    getAndRenderTodos()
  }, [])

  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data)
      console.log(data)
    })
    // .catch ((error) => {
    //   setRequestStatus(error)
    //   console.log(error)
    // })
  }

  const onTodoDelete = id => {
    deleteTodo(id).then(() => {
    getAndRenderTodos();
    })
    // .catch = error => {
    //   return setRequestStatus()
    // }
  }

  const addNewTask = todo => {
    addTodo(todo).then(() => {
      getAndRenderTodos();
    })
    // .catch ((error) => {
    //   return setRequestStatus()
    // })
  }

  return (
    <main>
      <h1>Todo List</h1>
      <div className="container">
        {/* { didRequestFail && <p error={setRequestStatus}>I  was not able to download the data this time. Please try again later.</p> }
        { !didRequestFail && ( */}
          <>
            <TodoCreation addNewTask={addNewTask}></TodoCreation>
            <TodoList todos={todos} onTodoDelete={onTodoDelete}></TodoList>
          </>
        {/* ) */}
        }
      </div>
    </main>
  )
}

export default App;