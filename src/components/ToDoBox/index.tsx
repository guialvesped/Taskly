import React from "react";
import { TodoProps } from "../../interfaces/ToDoProps";


const ToDo : React.FC<TodoProps> = (props : TodoProps) => {
    return (
        <>
        <div>
            <a>{props.title}</a>
            <p>{props.description}</p>
        </div>
        </>
    )
}

export default ToDo