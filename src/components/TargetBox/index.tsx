import React, { useState } from "react";
import ToDo from "../ToDoBox";
import setaDown from '../../assets/img/seta_down.svg'
import mais_verde from '../../assets/img/plus_verde.svg'
import style from './target.module.css'
import ButtonForm from "../ButtonForm";
import lixo from '../../assets/img/lixo.svg'
import alterTool from '../../assets/img/alter_tool.svg'
import { TargetCardProps} from "../../interfaces/TargetProps";
import { AxiosInstance } from "axios";
import Form from "../Form";
import { TodoProps } from "../../interfaces/ToDoProps";


const Target: React.FC<TargetCardProps> = (props: TargetCardProps) => {
    const [titleTd, setTitleTd] = useState('');
    const [descriptionTd, setDescriptionTd] = useState('');
    const [isCompleteTd, setIsCompleteTd] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

    const putTodo = async (event: React.FormEvent, rb: AxiosInstance, todo: TodoProps) => {
        event.preventDefault(); // Adicionado os parênteses
        if (editingTodoId === null) {
            console.error('ID do ToDo não definido!');
            return;
        }
        
        try {
            const response = await rb.put(`Todo/${editingTodoId}`, {
                id: editingTodoId,
                title: titleTd,
                description: descriptionTd,
                isComplete: isCompleteTd,
                targetId: todo.targetId
            });
            
            console.log(response.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const DeleteToDo = async (rb: AxiosInstance, todoId: number) => {
        try {
            const response = await rb.delete(`Todo/${todoId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const [isAlterFormVisible, setIsAlterFormVisible] = useState(false);
    const toggleVisibilityAlterForm = () => {
        setIsAlterFormVisible(!isAlterFormVisible);
    };

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={style.targetBox}>
            <div className={style.headTarget}>
                <ButtonForm
                    onClick={props.deleteTarget}
                    imgUrl={lixo}
                    isTrash = {true}
                />
                <a>{props.title}</a>
                <ButtonForm
                    onClick={props.onClickAlterTarget}
                    imgUrl={alterTool}
                    isTrash = {false}
                />
            </div>
            <p>{props.description}</p>
            <div className={isVisible ? style.toDoOn : style.toDoOff}>
                {props.toDoList && props.toDoList.length > 0 ? (
                    props.toDoList.map((toDo) => (
                        <React.Fragment key={toDo.id}>
                            <ToDo
                                key={toDo.id}
                                title={toDo.title}
                                description={toDo.description}
                                isComplete={toDo.isComplete}
                                id={toDo.id}
                                targetId={props.id}
                                onClickAlterTodo={() => {
                                    console.log(toDo);
                                    setEditingTodoId(toDo.id);
                                    setTitleTd(toDo.title); // Preenche os estados com os valores do ToDo
                                    setDescriptionTd(toDo.description);
                                    setIsCompleteTd(toDo.isComplete);
                                    toggleVisibilityAlterForm();
                                }}
                                deleteTodo={() => { DeleteToDo(props.requestBase, toDo.id); }}
                            />
                            <Form
                                cardTitle="Alter To Do"
                                isVisible={isAlterFormVisible}
                                onChangeTitle={(e) => setTitleTd(e.target.value)}
                                onChangeDesc={(e) => setDescriptionTd(e.target.value)}
                                onClick={toggleVisibilityAlterForm}
                                onSubmit={(e) => putTodo(e, props.requestBase, toDo)} // Passar o todo aqui
                                valorDesc={descriptionTd}
                                valorTitle={titleTd}
                            />
                        </React.Fragment>
                    ))
                ) : (
                    <p>Ainda não há um "ToDo" para este Target</p>
                )}
                <ButtonForm
                    onClick={props.onClick}
                    imgUrl={mais_verde}
                    text="Create new To Do"
                    isTrash = {false}
                />
            </div>
            <button onClick={toggleVisibility}>
                <img src={setaDown} alt="Exibir To Do" />
            </button>
        </div>
    );
};

export default Target;