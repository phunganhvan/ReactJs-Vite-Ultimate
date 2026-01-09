const TodoNew = (props) => {
    const { addNewTodo } = props;
    const handleClick = () => {
        addNewTodo();  
    }

    const handleChange = (e) => {
        console.log(e.target.value);
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