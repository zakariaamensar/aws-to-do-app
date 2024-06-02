import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://e07lfeifme.execute-api.us-east-1.amazonaws.com/prod";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/todos`);
      setTodos(JSON.parse(data.body));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = () => {
    // if (!newTodo) return;
    try {
      // const { data } = await axios.post(`${API_URL}/todos`, { text: newTodo });
      // console.log(data);
      // setTodos([...todos, JSON.parse(data.body)]);
      setTodos([
        { id: 1, text: "task1" },
        { id: 2, text: "task2" },
        { id: 3, text: "task3" },
      ]);
      console.log(todos);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, { completed });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do List</h1>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>{" "}
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo.id, !todo.completed)}
              />
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
