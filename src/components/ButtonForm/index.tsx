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
            {props.imgUrl}
            {props.text}
        </button>
        </>
    )
}