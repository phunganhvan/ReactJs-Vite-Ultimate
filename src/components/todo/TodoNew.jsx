import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;
    // useState hook
    const [valueInput, setValueInput] = useState("");
    const handleClick = () => {
        
        addNewTodo();  
    }

    const handleChange = (e) => {
        setValueInput(e.target.value);
    }
    return (
        <>
            <div className="todo-add">
                <input type="text" className="todo-input" placeholder="Enter todo..." onChange={(e) => handleChange(e)}/>
                <button className="todo-btn-add" onClick={handleClick}> Add </button>
            </div>
        </>
    );
}
export default TodoNew;