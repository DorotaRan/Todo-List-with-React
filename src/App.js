import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo, updateTodo } from './Requests';
import './App.css';
import TodoList from './Components/Sections/TodoList/TodoList';
import TodoForm from './Components/Sections/TodoForm/TodoForm';
import Modal from './Components/UI/Modal/Modal';

function App() {
  const [todos, updateTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(false);
  const [error, setRequestError]= useState(false);

  useEffect(() => {
    getAndRenderTodos()
  }, [])

  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data.reverse())
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

  const onTodoAdd = todo => {
    addTodo(todo).then(() => {
      getAndRenderTodos();
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const onTodoEdit = todo => {
    updateTodo(todo).then (() => {
      getAndRenderTodos();
      setEditedTodo(false)
    })
  }

  const openEditModal = todo => {
    setEditedTodo(todo)
  }

  // const onTodoToggle = todo => {
  //   let todoEdited = JSON.parse(JSON.stringify(todo));
  //   if(!todo.extra) {
  //     todoEdited.extra = 1
  //   } else {
  //     todoEdited.extra = null;
  //   }
  //   updateTodo(todo.id, todoEdited)
  //   .then(() =>{
  //     getAndRenderTodos();
  //   })
  //   .catch((error)=> {
  //     setRequestError(error);
  //     alert('connection error')
  //   })
  // }

  return (
    <main>
      <h1>Todo List</h1>
      <div className='container'>
        { error && (<p>I  was not able to download the data this time. Please try again later.</p>) }
        { !error && (
          <>
            <TodoForm onFormSubmitCallback={onTodoAdd}></TodoForm>
            <TodoList 
            todos={todos} 
            onTodoDelete={onTodoDelete} 
            // onTodoToggle={onTodoToggle} 
            onTodoEdit={openEditModal}/>
          </>
        )}
        {editedTodo && (
          <Modal>
            <TodoForm onFormSubmitCallback={onTodoEdit} isFormEdited todo={editedTodo} />
          </Modal>
        )}
      </div>
      
      
    </main>
  )
}

export default App;