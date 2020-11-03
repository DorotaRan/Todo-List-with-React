import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo, updateTodo } from './Requests';
import './App.css';
import TodoList from './Components/Sections/TodoList/TodoList';
import TodoForm from './Components/Sections/TodoForm/TodoForm';
import Modal from './Components/UI/Modal/Modal';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  const [todos, updateTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(false);
  const [error, setRequestError]= useState(false);
  const [loading, setLoading] = useState(true)
      
  useEffect(() => {
    getAndRenderTodos()
  }, [])

  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      setLoading(loading);
      updateTodos(data.reverse())
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const onTodoDelete = id => {
    deleteTodo(id).then(() => {
      setLoading(loading);
      getAndRenderTodos();
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const onTodoAdd = todo => {
    addTodo(todo).then(() => {
      setLoading(loading);
      getAndRenderTodos();
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
      console.log(todo.priority)
    })
  }

  const onTodoEdit = todo => {
    updateTodo(todo).then (() => {
      setLoading(loading);
      getAndRenderTodos();
      setEditedTodo(false)
    }).catch(error => {
      setRequestError(error)
      alert('connection error')
    })
  }

  const openEditModal = todo => {
    setEditedTodo(todo)
  }

  const onTodoToggle = todo => {
    console.log('klik')
    let todoEdited = JSON.parse(JSON.stringify(todo));

    if(!todo.extra) {
      todoEdited.extra = 1;
    } else {
      todoEdited.extra = null;
    }

    updateTodo(todo.id, todoEdited).then(() => {
      getAndRenderTodos();
    })
    .catch((error)=> {
      setRequestError(error);
      alert('connection error')
    })
  }

  return (
    <>
      <Router>
        <main>
          <h1>Todo List</h1>
          <div className='container'>
            <Switch>
              <Route exact path ="/">
                { loading && <FontAwesomeIcon icon={faSpinner} spin /> }
                { error && (<p>I  was not able to download the data this time. Please try again later.</p>) }
                { !error && (
                <>
                  <TodoForm onFormSubmitCallback={onTodoAdd}></TodoForm>
                  <TodoList 
                  todos={todos} 
                  onTodoDelete={onTodoDelete} 
                  onTodoToggle={onTodoToggle} 
                  onTodoEdit={openEditModal}/>
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