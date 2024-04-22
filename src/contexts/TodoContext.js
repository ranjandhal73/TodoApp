import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [ 
        {
            id:1,
            title: "todo1",
            completed: false,
        }    
    ],
    addTodo: (todo)=>{},
    updateTodo: (id, todo)=>{},
    removeTodo: (id)=>{},
    toggleComplete: (id)=>{},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = ()=>{
    return useContext(TodoContext)
}