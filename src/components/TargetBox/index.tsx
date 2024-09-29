import React from "react";
import { TargetProps } from "../../interfaces/TargetProps";
import ToDo from "../ToDoBox";
import style from './target.module.css'


const Target : React.FC<TargetProps> = (props : TargetProps) => {
    return (
        <div className={style.targetBox}>
            <a>{props.title}</a>
            <p>{props.description}</p>
            {props.toDoList && props.toDoList.length  > 0 ? (
                props.toDoList.map((toDo) => (
                    <ToDo
                    key={toDo.id}
                    title={toDo.title}
                    description={toDo.description}
                    isComplete={toDo.isComplete}
                    id={toDo.id}
                    targetId={props.id}
                    />
                ))
                ) : (<p>Ainda não há um "ToDo" para este Target</p>)
            }
            
        </div>
    )
}

export default Target