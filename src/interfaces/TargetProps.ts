
export interface TargetProps {
    
    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;

    todo : any[]
} 
export interface TargetCardProps {
  id: number,
    
  title: string,
    
  description: string,
    
  isComplete: boolean,

  toDoList : any[],
  onClick : () => void,
  onClickAlterTarget : () => void,
  deleteTarget : () => void
}