import React, { FormEventHandler } from "react";
import style from './form.module.css'
interface FormProps{
    targetOrTodo : string,
    onSubmit : FormEventHandler<HTMLFormElement>,
    valorTitle : string,
    valorDesc : string,
    onChangeTitle : (e : any) => void,
    onChangeDesc : (e : any) => void,
    isVisible : boolean,
    onClick : () => void
}

const Form : React.FC<FormProps> = (props : FormProps) => {

    return(
        <>
        <form onSubmit={props.onSubmit} className={props.isVisible ? style.formOn : style.formOff}>
            <a>New {props.targetOrTodo}</a>
            <label>
                Title
                <input 
                type="text"
                value={props.valorTitle}
                onChange={props.onChangeTitle}
                placeholder={`Give a tittle to your ${props.targetOrTodo}`}
                 />
            </label>
            <label>
                Description
                <input 
                type="text"
                value={props.valorDesc}
                onChange={props.onChangeDesc}
                placeholder={`Give a description to your ${props.targetOrTodo}`}
                 />
            </label>
            <button type="submit">Enviar</button>
            <button onClick={props.onClick}>Cancelar</button>
        </form>
        </>
    )
}

export default Form