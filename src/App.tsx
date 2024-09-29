import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  interface Todo {

    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;
    
    targetId: number;
    
  }
    
  interface Target {
    
    id: number;
    
    title: string;
    
    description: string;
    
    isComplete: boolean;
    
  } 
  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
    
  const [target, setTargets] = useState<Target>();
    
  const [todo, setTodo] = useState<Todo>();
    
  const [todoId, setTodoId] = useState<number>(0);
    
  const [targetId, setTargetId] = useState<number>(0);
    
    
  const requestBase = axios.create({
    
    baseURL: baseUrl,
    
    headers: {
    
    'Content-Type': 'application/json',
    
    },
    
  });
    
    
  const getData = async () => { //Pega Target
    
    try {
    
    const response = await requestBase.get('Targets');//Busca na api por 'Targets', inserindo o que esta dentro do get() na URL
    
    setTargets(response.data); // Armazena os dados recebidos no estado
    
    } catch (error) {
    
    console.error('Erro na requisição:', error);
    
    }
    
  };
    
  const postData = async () => {
    
    try {
    
    const response = await requestBase.post('targets', {
    
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
    
    
  const DeleteData = async () => {
    
    try {
    
    const response = await requestBase.delete(`todo/${todoId}`);
    
    setTodo(response.data); // Armazena os dados recebidos no estado
    
    } catch (error) {
    
    console.error('Erro na requisição:', error);
    
    }
    
  };

  return (
    <>
      
    </>
  )
}

export default App
