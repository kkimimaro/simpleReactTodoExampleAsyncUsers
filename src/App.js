import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
import GetUsers from "./Todo/GetUsers";

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./Todo/AddTodo"));
      }, 2000);
    })
);

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper fadeInDown">
        <div className="formContent">
          <img
            type="image"
            src="https://coursework.vschool.io/content/images/2015/08/todo_logo.gif"
            id="icon"
            alt="User Icon"
            height="55"
            width="133"
          />{" "}
          <br />
          <Modal />
          <GetUsers/>
          <React.Suspense
            fallback={<p style={{ color: "#c9ad86" }}>Loading...</p>}
          >
            <AddTodo onCreate={addTodo} />
          </React.Suspense>
          {loading && <Loader />}
          {todos.length ? (
            <TodoList todos={todos} onToggle={toggleTodo} />
          ) : loading ? null : (
            <p>No Todos!</p>
          )}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
