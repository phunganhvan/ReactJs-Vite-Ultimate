import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import imgReact from "./assets/react.svg"
const App = () =>  {


  const addNewTodo = () => {
    alert("Add new todo");
  }

  return (
    <>
        <div className="todo-container">
          <h1 className="todo-title"> Todo list</h1>
          <TodoNew addNewTodo={addNewTodo} />
          <TodoData/>
          <img src={imgReact} alt="react logo" className="todo-logo" /> 
        </div>
      
      
    </>
  )
}

export default App
