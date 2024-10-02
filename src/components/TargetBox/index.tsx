import React, { useState } from "react";
import { TargetProps } from "../../interfaces/TargetProps";
import ToDo from "../ToDoBox";
import setaDown from '../../assets/img/seta_down.svg'
import mais_verde from '../../assets/img/plus_verde.svg'
import style from './target.module.css'
import ButtonForm from "../ButtonForm";
import lixo from '../../assets/img/lixo.svg'
import alterTool from '../../assets/img/alter_tool.svg'
import { TargetCardProps } from "../../interfaces/TargetCardProps";

const Target : React.FC<TargetCardProps> = (props : TargetCardProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
      console.log(props.toDoList
      )
    };
    return (
        <div className={style.targetBox}>
            <div className={style.headTarget}>
                <ButtonForm
                 onClick={props.deleteTarget}
                 imgUrl={lixo}
                />
                <a>
                    {props.title}
                </a>
                <ButtonForm
                onClick={props.onClick}
                imgUrl={alterTool}
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
            <ButtonForm
             onClick={toggleVisibility}
             imgUrl={setaDown}
            />
        </div>
    )
}

export default Target