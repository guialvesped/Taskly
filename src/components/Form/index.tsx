import React, { FormEventHandler } from "react";
import style from './form.module.css'
import lixo from '../../assets/img/lixo.svg'
import sendPlane from '../../assets/img/sendPlane.svg'
interface FormProps{
    cardTitle : string,
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
            <a>{props.cardTitle}</a>
            <label>
                Title
                <input 
                type="text"
                value={props.valorTitle}
                onChange={props.onChangeTitle}
                placeholder={`Give a tittle to your ${props.cardTitle}`}
                 />
            </label>
            <label>
                Description
                <input 
                type="text"
                value={props.valorDesc}
                onChange={props.onChangeDesc}
                placeholder={`Give a description to your ${props.cardTitle}`}
                 />
            </label>
            <button type="submit">
                <img src={sendPlane} alt="" />
                Enviar
            </button>
            <button type='reset' onClick={props.onClick}>
                <img src={lixo} alt="" />
                Cancelar
            </button>
        </form>
        </>
    )
}

export default Form