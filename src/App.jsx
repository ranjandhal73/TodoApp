import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoFrom from "./components/TodoFrom";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodo] = useState([]);

  const addTodo = (todo) => {
    setTodo([...todos, {id: Math.random(), ...todo}]);
  };

  const updateTodo = (id, todo) =>{
    setTodo((prev)=>prev.map((item)=>(item.id === id ? todo : item)));
  }

  const removeTodo = (id) =>{
    setTodo((prev)=>prev.filter((item)=>item.id !== id));
  }

  const toggleComplete = (id) =>{
    setTodo((prev)=> prev.map((item)=> item.id === id ? {...item, completed: !item.completed}: item));
  }

  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem('todos'));

   if(todos && todos.length > 0){
      setTodo(todos)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, removeTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoFrom />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((item)=>(
              <div key={item.id} className="w-full">
                <TodoItem todo ={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
