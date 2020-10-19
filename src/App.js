import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo } from './Requests';
import './App.css';
import Button from './Components/UI/Button/Button';
import Input from './Components/UI/Input/Input';

function App() {
  const [todos, updateTodos] = useState([]);
  const [titleValidationLabel, setTitleValidationLabel] = useState('');

  useEffect(() => {
    getAndRenderTodos()
  }, [])

  const getAndRenderTodos = () => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data)
    });
  }

  const onDelete = (id) => {
    deleteTodo(id);
    getAndRenderTodos();
  }

  const addNewTask = (event) => {
    event.preventDefault();

    const { elements: inputs } = event.target;
    // Zrobić na kolejnej lekcji *

    if (inputs[0].value.length < 5) {
      setTitleValidationLabel('Provide a longer title!')
      return;
    }

    const todo = {
      title: inputs[0].value,
      description: inputs[1].value,
    }

    addTodo(todo).then(() => {
      getAndRenderTodos();
    });

    for (const input of inputs) {
      input.value = "";
    }
  }

  const onBtnSubmit = () => {
    console.log('klik!')
  }

  return (
    <main>
      <div className="container">
        <h1>Create a task</h1>
        <form onSubmit={addNewTask}>
          <Input
            placeholder="Go out with a dog"
            label="Provide a task name"
            id="taskTitle"
            name="taskTitle"
            validationError={titleValidationLabel}
          />
          <Input placeholder="Do it after it eats" label="Provide a task description" id="taskDesc" name="taskDesc" />
          
          <button type="submit">ADD</button>
        </form>

        <Button
          label="KLKNIJ MNIE!"
          type="submit"
          callbackFn={onBtnSubmit}
          size={2}
          variant="add"
        />

        <h1>List of tasks:</h1>
        {todos.map(todo => {
          return (
            <div className="todo" key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <Button
                label="Delete"
                callbackFn={() => {onDelete(todo.id)}}
                variant="delete"
              />
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default App;

