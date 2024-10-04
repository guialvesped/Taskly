import React from "react";
import style from './button.module.css'
interface ButtonFormProps {
    onClick ?:  () => void 
    text ?: string,
    imgUrl ?: string, 
    isTrash : boolean
}

const ButtonForm : React.FC<ButtonFormProps> = (props : ButtonFormProps) => {
    return(
        <>
        <button className={props.isTrash ? style.buttonTrash : style.buttonAdd} onClick={props.onClick}>
            <img src={props.imgUrl} alt="" />
            {props.text}
        </button>
        </>
    )
}
export default ButtonForm;