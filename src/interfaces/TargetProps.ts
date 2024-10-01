import { TodoProps } from "./ToDoProps";

export interface TargetProps {
    
    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;

    toDoList : TodoProps[],
<<<<<<< Updated upstream
    onClick : () => void
=======
    onClick : () => void,
    deleteTarget : (e: any) => void
>>>>>>> Stashed changes
    
  } 