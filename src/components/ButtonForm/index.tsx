import React from "react";

interface ButtonFormProps {
    onClick : () => void,
    text : string,
    imgUrl ?: string
}

const ButtonForm : React.FC<ButtonFormProps> = (props : ButtonFormProps) => {
    return(
        <>
        <button onClick={props.onClick}>
            <img src={props.imgUrl} alt="" />
            {props.text}
        </button>
        </>
    )
}
export default ButtonForm;