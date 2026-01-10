import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import imgReact from "./assets/react.svg"
import { useState } from "react"
const App = () =>  {

  const [todoList,  setTodoList] = useState([
    {id: 1, title: "Learning HTML, Css, Js"},
    {id: 2, title: "Learning Reactjs"},
    {id: 3, title: "Learning Nodejs"},
  ])
  const randomId = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const addNewTodo = (title) => {
    // alert(title);
    setTodoList ( [
      ...todoList,
      {id: randomId(1, 1000000), title: title}
    ])
  }
  const handleDelete = (id) => {
    let currentTodoList  = todoList.filter (item => item.id !== id);
    setTodoList (currentTodoList);
  }

  return (
    <>
        <div className="todo-container">
          <h1 className="todo-title"> Todo list</h1>
          <TodoNew addNewTodo={addNewTodo}  />
          { todoList.length !== 0 ? 
            <TodoData todo={todoList} handleDelete={handleDelete} />
                :
            <img src={imgReact} alt="react logo" className="todo-logo" /> 
          } 
        </div>
      
      
    </>
  )
}

export default App
