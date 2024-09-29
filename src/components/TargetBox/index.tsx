import React, { useState } from "react";
import { TargetProps } from "../../interfaces/TargetProps";
import ToDo from "../ToDoBox";
import setaDown from '../../assets/img/seta_down.svg'
import style from './target.module.css'


const Target : React.FC<TargetProps> = (props : TargetProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    return (
        <div className={style.targetBox}>
            <a>{props.title}</a>
            <p>{props.description}</p>
            <button onClick={toggleVisibility}>
                <img src={setaDown} alt="Exibir To Do" />
            </button>
            <div className={isVisible ? style.toDoOn : style.toDoOff}>
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
            
        </div>
    )
}

export default Target