import React from "react";
import { TodoCardProps} from "../../interfaces/ToDoProps";
import style from './toDoBox.module.css'
import ButtonForm from "../ButtonForm";
import lixo from '../../assets/img/lixo.svg'
import alterTool from '../../assets/img/alter_tool.svg'

const ToDo : React.FC<TodoCardProps> = (props : TodoCardProps) => {
    return (
        <>
        <div className={style.toDoBox}>
            <div className={style.headTarget}>
                <ButtonForm
                 onClick={props.deleteTodo}
                 imgUrl={lixo}
                 isTrash = {true}
                />
                <a>
                    {props.title}
                </a>
                <ButtonForm
                onClick={props.onClickAlterTodo}
                imgUrl={alterTool}
                isTrash = {false}
                />
            </div>
            <p>{props.description}</p>
        </div>
        </>
    )
}

export default ToDo