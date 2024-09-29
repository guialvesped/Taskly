import React from "react";
import { TodoProps } from "../../interfaces/ToDoProps";
import style from './toDoBox.module.css'


const ToDo : React.FC<TodoProps> = (props : TodoProps) => {
    return (
        <>
        <div className={style.toDoBox}>
            <a>{props.title}</a>
            <p>{props.description}</p>
        </div>
        </>
    )
}

export default ToDo