import axios from "axios";

//const API_BASE_URL = "http://localhost:8080/api/todos";
//const API_BASE_URL = "http://13.201.205.120:8080/api/todos";
const API_BASE_URL = "https://kamstar-test.shop/api/todos";
//const API_BASE_URL = "https://todo-backend-alb-699487798.ap-south-1.elb.amazonaws.com/api/todos";

export const getTodos = () => axios.get(API_BASE_URL);

export const createTodo = (todo) =>
  axios.post(API_BASE_URL, todo);

export const updateTodo = (id, todo) =>
  axios.put(`${API_BASE_URL}/${id}`, todo);

export const deleteTodo = (id) =>
  axios.delete(`${API_BASE_URL}/${id}`);

