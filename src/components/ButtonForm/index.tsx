import React from "react";
import style from './button.module.css'
interface ButtonFormProps {
    onClick : () => void,
    text : string,
    imgUrl ?: string
}

const ButtonForm : React.FC<ButtonFormProps> = (props : ButtonFormProps) => {
    return(
        <>
        <button className={style.buttonAdd} onClick={props.onClick}>
            <img src={props.imgUrl} alt="" />
            {props.text}
        </button>
        </>
    )
}
export default ButtonForm;