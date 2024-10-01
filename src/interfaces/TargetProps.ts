import { TodoProps } from "./ToDoProps";

export interface TargetProps {
    
    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;

    toDoList : TodoProps[],
    onClick : () => void,
    deleteTarget : (e: any) => void
    
  } 