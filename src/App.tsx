import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { TargetProps } from './interfaces/TargetProps';
import { TodoProps } from './interfaces/ToDoProps';
import Target from './components/TargetBox';
import React from 'react';
import Form from './components/Form';
import ButtonForm from './components/ButtonForm';
import mais_amarelo from './assets/img/plus_amarelo.svg'
import mais_verde from './assets/img/plus_verde.svg'

function App() {
 
    
  
  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
    
  const [targets, setTargets] = useState<TargetProps[]>([]);
    
  const [todo, setTodo] = useState<TodoProps[]>([]);
    
  const [todoId, setTodoId] = useState<number>(0);
    
  const [targetId, setTargetId] = useState<number>(0);
  //Target
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  //ToDO
  const [titleTd, setTitleTd] = useState('');
  const [descriptionTd, setDescriptionTd] = useState('');
  const [isCompleteTd, setIsCompleteTd] = useState(false);
    
    
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
    
  const postTarget = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsComplete(false)
      const response = await requestBase.post('Targets', {
      
        title: title,
        
        description: description,
        
        isComplete: isComplete,
        
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

  
  const putTarget = async(event: React.FormEvent) => {
    event.preventDefault;
    try {
      const response = await requestBase.put(`Targets/${targetId}`,{
    
        title: title,
        
        description: description,
        
        isComplete: isComplete,
        
        todo: todo
        
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

  const postTodo = async (event: React.FormEvent, targetId: number) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página
  
    try {
      // Faz o POST para criar o novo ToDo
      const response = await requestBase.post('Todos', { // Verifique se o endpoint é 'Todos'
        title: titleTd,
        description: descriptionTd,
        isComplete: false,
        targetId: targetId, // Associa o ToDo ao targetId correto
      });
  
      console.log('ToDo criado com sucesso:', response.data);
  
      setDescriptionTd('')
      setTitleTd('')
    } catch (error) {
      console.error('Erro ao criar o ToDo:', error);
    }
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
  
  const putTodo = async (event: React.FormEvent) => {
    event.preventDefault
    
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
    const intervalId = setInterval(getTarget, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const [isVisibleTarget, setIsVisibleTarget] = useState<boolean>(false)
  const [isVisibleTodo, setIsVisibleToDo] = useState<boolean>(false)
  const toggleVisibilityFormTarget = () => {
    setIsVisibleTarget(!isVisibleTarget);
  };
  const toggleVisibilityFormToDo = () => {
    setIsVisibleToDo(!isVisibleTodo);
  };

  return (
    <>
      <h1>Lista de Targets</h1>
      <div className='addButton'>
        <ButtonForm
         onClick={toggleVisibilityFormTarget}
         text='Create new target'
         imgUrl={mais_amarelo}
        />
      </div>
      <div className='main'>
        {targets.length > 0 ? (
          targets.map((target) => (
            <React.Fragment key={target.id}>
              <Target
                title={target.title}
                id={target.id}
                description={target.description}
                isComplete={target.isComplete}
                toDoList={target.toDoList}
                onClick={toggleVisibilityFormToDo}
              />
              <Form
                targetOrTodo='ToDo'
                onSubmit={(event) => {
                  event.preventDefault();
                  postTodo(event, target.id)
                }}
                onChangeTitle={(e) => {setTitle(e.target.value)}}
                onChangeDesc={(e) => {setDescription(e.target.value)}}
                valorTitle={title}
                valorDesc={description}
                isVisible={isVisibleTodo}
                onClick={toggleVisibilityFormToDo}
                />
            </React.Fragment>
          ))
        ) : (
          <h4>Lista de Targets Vazia...</h4>
        )}
        <Form
        targetOrTodo='Target'
        onSubmit={postTarget}
        onChangeTitle={(e) => {setTitle(e.target.value)}}
        onChangeDesc={(e) => {setDescription(e.target.value)}}
        valorTitle={title}
        valorDesc={description}
        isVisible={isVisibleTarget}
        onClick={toggleVisibilityFormTarget}
        /> 
      </div>
           
    </>
  )
}

export default App
