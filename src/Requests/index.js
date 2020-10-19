import axios from 'axios';

export const getTodos = () => {
  return axios.get('http://51.75.120.145:3000/todo');
}

export const deleteTodo = id => {
  return axios.delete(`http://51.75.120.145:3000/todo/${id}`);
}

export const addTodo = task => {
  return axios.post('http://51.75.120.145:3000/todo', task);
}

export const updateTodo = (task, id) => {
    return axios.put(`http://51.75.120.145:3000/todo/${id}`, task)
}