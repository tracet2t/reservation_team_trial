import { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    setTodoList([...todoList, { todoName: todo }]);
    setTodo("");
  };

  const deleteTodo = (deleteValue) => {
    const restTodoList = [
      ...todoList.filter((val) => {
        return val.todoName !== deleteValue;
      }),
    ];
    setTodoList(restTodoList);
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center">
      <div className="w-[500px] mx-auto text-center bg-white p-5">
        <h1 className="text-5xl font-bold mb-8">Todo List</h1>
        <form onSubmit={handleForm}>
          <input
            className="border-2 placeholder:text-gray-500 rounded-lg border-black w-full p-5 mb-5 text-black"
            type="text"
            placeholder="Add Task"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-3 px-8 rounded-lg mb-8"
          >
            Add Task
          </button>
        </form>
        <div className="todo-show-area">
          <ul>
            {todoList.map((singleTodo, index) => {
              return (
                <li
                  key={index}
                  className="bg-black mb-5 flex justify-between  text-white py-5 rounded-lg text-3xl px-5"
                >
                  {singleTodo.todoName}{" "}
                  <span
                    onClick={() => deleteTodo(singleTodo.todoName)}
                    className="text-red-600 cursor-pointer"
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;