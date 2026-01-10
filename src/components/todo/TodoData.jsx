// import DeleteTodo from "./DeleteTodo";

const TodoData = (props) => {
    const { todo, handleDelete } = props;
    const handleClick = (id) => {
        console.log(">>> Click delete todo id: ", id);
        handleDelete(id);
    }
    console.log(">>> Check props todoList: ", todo);
    return (
        <>
            <div className="todo-list">
                {/* List items will be added here */}
                {todo && todo.length > 0 &&
                    todo.map((item, _) => {
                        return (
                            <div className="todo-item" key={item.id}>
                                <div>{item.title}</div>
                                <button onClick={ () => handleClick(item.id)} style={{cursor: "pointer"}}> </button>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default TodoData;