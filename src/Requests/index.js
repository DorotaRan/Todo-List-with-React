import axios from "axios"


export const getTodos = () => {
    return axios.get('http://51.75.120.145:3000/todo');
}