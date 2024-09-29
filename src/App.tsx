import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { TargetProps } from './interfaces/TargetProps';
import { TodoProps } from './interfaces/ToDoProps';

function App() {
 
    
  
  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
    
  const [targets, setTargets] = useState<TargetProps[]>([]);
    
  const [todo, setTodo] = useState<TodoProps | null>();
    
  const [todoId, setTodoId] = useState<number>(0);
    
  const [targetId, setTargetId] = useState<number>(0);
    
    
  const requestBase = axios.create({
    
    baseURL: baseUrl,
    
    headers: {
    
    'Content-Type': 'application/json',
    
    },
    
  });
    
    
  const getTarget = async () => { //Pega Target
    
    try {
    
      const response = await requestBase.get('Targets');//Busca na api por 'Targets', inserindo o que esta dentro do get() na URL
    
      setTargets(response.data); // Armazena os dados recebidos no estado
      console.log(response.data)
    
    } catch (error) {
    
      console.error('Erro na requisição:', error);
    
    }
    
  };
    
  const postTarget = async () => {
    
    try {
    
      const response = await requestBase.post('Targets', {
      
        title: 'Demo da aula',
        
        description: 'Mostando como fazer um post com axios',
        
        isComplete: false,
        
        todo:[]
      
      });
    
      console.log(response.data);
    
    } catch (error) {
    
      console.error('Erro na requisição:', error)
    
    };
    
  };

  const getTargetById = async () => {
    try {
      // Faz uma requisição GET para buscar o Target específico pelo ID
      const response = await requestBase.get(`Targets/${targetId}`);
      
      // Armazena o Target recebido no estado
      setTargets(response.data);
      
      console.log(targets); // Mostra o Target no console para verificação
    } catch (error) {
      console.error('Erro ao buscar Target com ID específico:', error);
    }
  };

  
  const putTarget = async() => {
    try {
      const response = await requestBase.put(`Targets/${targetId}`,{
    
        title: 'Demo da aula',
        
        description: 'Mostando como fazer um post com axios',
        
        isComplete: false,
        
        todo:[]
        
      })

    }catch(error){
      console.error('Erro na requisição:', error)
    }
  }

  const DeleteTarget = async () => {
    
    try {
    
      const response = await requestBase.delete(`Targets/${todoId}`);
    
      setTodo(response.data); // Armazena os dados recebidos no estado
    
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    
  };

  const getToDo = async () => {
    try {
      const response = await requestBase.get('Todo')
      setTodo(response.data)
      console.log(todo)
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  const postTodo = async () => {
  
    try {
    
    const response = await requestBase.post('Todo', {
    
      title: 'Primeiro',
      
      description: 'Montar a estrutura do request - URL e Headers',
      
      isComplete: false,
      
      targetId: 22
      
      });
    
      console.log(response.data);
    
    } catch (error) {
    
      console.error('Erro na requisição:', error)
    
    };
    
  };
    
  const getToDoById = async () => {
    try {
      // Faz uma requisição GET para buscar o Target específico pelo ID
      const response = await requestBase.get(`Targets/${targetId}`);
      // Armazena o Target recebido no estado
      setTargets(response.data);
      
      console.log(targets); // Mostra o Target no console para verificação
    } catch (error) {
      console.error('Erro ao buscar Target com ID específico:', error);
    }
  }
  
  const putTodo = async () => {
    
    try {
    
    const response = await requestBase.put(`Todo/${todoId}`, {
    
    id: todoId,
    
    title: 'Segundo',
    
    description: 'Montar a estrutura do request - URL e Headers',
    
    isComplete: false,
    
    targetId: 22
    
    });
    
    console.log(response.data);
    
    } catch (error) {
    
    console.error('Erro na requisição:', error)
    
    };
    
  };
    
    
  const DeleteToDo = async () => {
    
    try {
    
    const response = await requestBase.delete(`Todo/${todoId}`);
    
    setTodo(response.data); // Armazena os dados recebidos no estado
    
    } catch (error) {
    
    console.error('Erro na requisição:', error);
    
    }
    
  };

  useEffect(() => {
    getTarget();
  }, []);

  return (
    <>
    </>
  )
}

export default App
