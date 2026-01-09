const TodoData = (props) => {
    const { todo } = props;
    console.log(">>> Check props todoList: ", todo);
    return (
        <>
            <div className="todo-list">
                <p>Learning HTML, Css, Js</p>
                {/* List items will be added here */}
                {todo && todo.length > 0 &&
                    todo.map((item, _) => {
                        return (<p key={item.id}>{item.title}</p>)
                    })
                }
            </div>
        </>
    )
}

export default TodoData;