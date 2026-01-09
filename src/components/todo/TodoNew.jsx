const TodoNew = (props) => {
    const { addNewTodo } = props;
    return (
        <>
            <div className="todo-add">
                <input type="text" className="todo-input" placeholder="Enter todo..." />
                <button className="todo-btn-add" onClick={addNewTodo}> Add </button>
            </div>
        </>
    );
}
export default TodoNew;