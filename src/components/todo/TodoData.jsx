const TodoData = (props) => {
    const { todo } = props;
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
                                <button>Delete</button> 
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default TodoData;