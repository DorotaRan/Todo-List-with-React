import React, { useEffect, useState } from 'react';
import { getTodos } from './Requests'
import './App.css';

function App() {
  const [todos, updateTodos] = useState([]);
  
  useEffect(() => {
    getTodos().then(response => {
      const { data } = response;
      updateTodos(data);
    });
  }, [])
  return (
    <main>
      <ul>
        {todos.map(todo => {
          return <li>{todo.title}</li>
        })
        }

      </ul>
    </main>
  );
}

export default App;
