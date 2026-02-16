import "./Todo.css";
import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "../api/todoApi";

function TodoComp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    getTodos().then(res => setTodos(res.data));
  };

  const handleAddTodo = () => {
    if (!title.trim()) return;

    createTodo({ title, completed: false }).then(() => {
      setTitle("");
      loadTodos();
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id).then(loadTodos);
  };

  const handleToggleCompleted = (todo) => {
    updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed
    }).then(loadTodos);
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = (todo) => {
    if (!editTitle.trim()) return;

    updateTodo(todo.id, {
      ...todo,
      title: editTitle
    }).then(() => {
      setEditingId(null);
      setEditTitle("");
      loadTodos();
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="todo-container">
      <h1>Todos</h1>

      <div className="todo-input">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <div className="todo-left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo)}
              />

              {editingId === todo.id ? (
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
              ) : (
                <span
                  className={`todo-text ${todo.completed ? "completed" : ""}`}
                >
                  {todo.title}
                </span>
              )}
            </div>

            <div className="todo-actions">
              {editingId === todo.id ? (
                <>
                  <button onClick={() => handleSave(todo)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </>
              )}
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default TodoComp;
