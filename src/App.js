import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo, updateTodo, editTodo} from './Requests';
import './App.css';
import TodoList from './Components/Sections/TodoList/TodoList';
import TodoForm from './Components/Sections/TodoForm/TodoForm';
import Modal from './Components/UI/Modal/Modal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

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
      console.log(todo.priority)
    })
  }

  const onTodoEdit = todo => {
    editTodo(todo).then (() => {
      setEditedTodo(false);
      getAndRenderTodos();

    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const openEditModal = todo => {
    setEditedTodo(todo)
  }

  const onTodoToggle = todo => {
    let todoEdited = JSON.parse(JSON.stringify(todo));
    if(!todo.extra) {
      todoEdited.extra = 1;
    } else {
      todoEdited.extra = null;
    }
    updateTodo(todo.id, todoEdited).then(() => {
      getAndRenderTodos()
    })
    .catch((error)=> {
      setRequestError(error);
      alert('connection error')
    })
  }

  const [isLoading, setLoading] = useState(true)
   
  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }
  useEffect(() => {
    fakeRequest().then(() => {
      const element = document.querySelector(".loader-container");
      if (element) {
        element.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Router>
        <main>
          <h1>Todo List</h1>
          <div className='container'>
            <Switch>
              <Route exact path ='/'>
                { error && (<p>I  was not able to download the data this time. Please try again later.</p>) }
                { !error && (
                <>
                  <TodoForm onFormSubmitCallback={onTodoAdd}></TodoForm>
                  <TodoList 
                    todos={todos} 
                    onTodoDelete={onTodoDelete} 
                    onTodoToggle={onTodoToggle} 
                    onTodoEdit={openEditModal}
                  />
                </>
                )}
                {editedTodo && (
                <Modal>
                  <TodoForm onFormSubmitCallback={onTodoEdit} isFormEdited todo={editedTodo} />
                </Modal>
                )}
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </>

  )
}

export default App;