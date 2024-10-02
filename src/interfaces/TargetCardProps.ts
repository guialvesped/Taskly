 export interface TargetCardProps {
    id: number,
    
    title: string,
    
    description: string,
    
    isComplete: boolean,

    toDoList : any[],
    onClick : () => void,
    deleteTarget : () => void
 }