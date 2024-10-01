import React, { useState } from "react";
import { TargetProps } from "../../interfaces/TargetProps";
import ToDo from "../ToDoBox";
import setaDown from '../../assets/img/seta_down.svg'
import mais_verde from '../../assets/img/plus_verde.svg'
import style from './target.module.css'
import ButtonForm from "../ButtonForm";
import lixo from '../../assets/img/lixo.svg'


const Target : React.FC<TargetProps> = (props : TargetProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    return (
        <div className={style.targetBox}>
            <div className={style.headTarget}>
                <button onClick={props.deleteTarget}>
                        <img src={lixo} alt="" />
                </button>
                <a>
                    {props.title}
                </a>
                <ButtonForm
                onClick={props.onClick}
                imgUrl={mais_verde}
                text=""
                />
            </div>
            <p>{props.description}</p>
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
                <ButtonForm
                onClick={props.onClick}
                imgUrl={mais_verde}
                text="Create new To Do"
                />
            </div>
            <button onClick={toggleVisibility}>
                <img src={setaDown} alt="Exibir To Do" />
            </button>
        </div>
    )
}

export default Target