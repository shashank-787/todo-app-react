import { useEffect, useState } from "react";
import { Todo } from "./components/Todo";
import { IoMdAddCircleOutline } from "react-icons/io";


import { Button } from "./components/Button";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); //state variable which is an array of objects
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("todos") != null) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocal = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  function addTodo() {
    if (title.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title,
        description,
        isCompleted: false,
      },
    ]);
    setTitle("");
    setDescription("");
    saveToLocal([
      ...todos,
      {
        id: uuidv4(),
        title,
        description,
        isCompleted: false,
      },
    ]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id != id));
    saveToLocal(todos.filter((todo) => todo.id != id));
  }

  function editTodo(id, title, description) {
    if (title.trim() === "") return;
    const updatedTodos = todos.map((todo) =>
      todo.id == id ? { ...todo, title: title, description: description } : todo
    );
    setTodos(updatedTodos);
    saveToLocal(updatedTodos);
  }

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((todo) =>
      todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveToLocal(updatedTodos);
  };

  const toggleShowAll = (e) => {
    setShowAll(!showAll);
  };
  return (
    <>
      <div className="w-full md:w-1/2 min-h-[80dvh] my-10 p-5 rounded-2xl  mx-auto  bg-gray-300/50 ">
        <h1 className="font-bold text-xl mb-3">Add new todo</h1>
        <div className="input-box flex items-center gap-5 mb-2">
          <div className="flex-grow"> 
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 py-1 px-1 border-0 outline-1  block"
                type="text"
                placeholder="Title"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-1 py-1 px-1 border-0 outline-1  block"
                type="text"
                placeholder="Description"
              />
          </div>
          {/* <Button onClick={addTodo} name={"Create"} color={"blue"} /> */}
          <button onClick={addTodo} className="cursor-pointer" ><IoMdAddCircleOutline size={"30px"} /></button>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <input id="showAll" onChange={toggleShowAll} type="checkbox" value="" style={{ accentColor: '#16a34a' }} className="w-4 h-4 border border-black" />
          <label className="" htmlFor="showAll">Show All</label>
        </div>

        <h2 className="font-bold text-xl mb-3">Your Todos </h2>
          <ul>
            {todos.map((todo) => {
              return (
                (showAll || !todo.isCompleted) && 
                  <Todo
                    key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} handleCheckBox={handleCheckBox}
                  />
              )})}
          </ul>
      </div>
    </>
  );
}

export default App;
