
export interface TodoProps {

    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;
    
    targetId: number;
    
}
export interface TodoCardProps{
  id: number;
    
  title: string;
    
  description: string;
    
  isComplete: boolean;
    
  targetId: number;

  onClickAlterTodo ?:  () => void;

  deleteTodo ?: () => void;       
}