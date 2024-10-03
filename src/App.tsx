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

function App() {
 
    
  
  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
    
  const [targets, setTargets] = useState<TargetProps[]>([]);
    
  const [todos, setTodo] = useState<TodoProps[]>([]);
    
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
    'Access-Control-Allow-Headers' : 'privatekey'
    
    },
    
  });
    
    
  const getTarget = async () => {
    
    try {
    
      const response = await requestBase.get('Targets');
    
      setTargets(response.data);
      //console.log(response.data)
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
      const response = await requestBase.get(`Targets/` + targetId);
      
      setTargets(response.data);
      
      console.log(targets);
    } catch (error) {
      console.error('Erro ao buscar Target com ID específico:', error);
    }
  };

  
  const putTarget = async(event: React.FormEvent, targetId : number,target : TargetProps) => {
    event.preventDefault();
    try {
      const response = await requestBase.put(`Targets/${targetId}`,{
        
        id : targetId,
    
        title: title,
        
        description: description,
        
        isComplete: target.isComplete,
        
        todo: target.todo
        
      })
      console.log(response.data, "Alteração feita com sucesso")
    }catch(error){
      console.error('Erro na requisição:', error)
    }
  }

  const DeleteTarget = async (targetId : number) => {
    
    try {
    
      const response = await requestBase.delete(`Targets/${targetId}`);
    
      setTodo(response.data);
    
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    
  };

  const getToDo = async () => {
    try {
      const response = await requestBase.get('Todo')
      setTodo(response.data)
      console.log(todos)
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  const postTodo = async (event: React.FormEvent, targetId: number) => {
    event.preventDefault();
    console.log(targetId)
    try {
      const response = await requestBase.post('Todo', {
        title: titleTd,
        description: descriptionTd,
        isComplete: false,
        targetId: targetId
      });
      setTitleTd('');  // Limpa o campo de título
      setDescriptionTd('');
      console.log('ToDo criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar o ToDo:', error);
    }
  };
    
  const getToDoById = async (todoId : number) => {
    try {
      
      const response = await requestBase.get(`Todo/${todoId}`);
    
    } catch (error) {
      console.error('Erro ao buscar Target com ID específico:', error);
    }
  }
  
  const putTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    
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
    getToDo();
    const intervalId = setInterval(getTarget, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const [isVisibleTarget, setIsVisibleTarget] = useState<boolean>(false)
  const [isVisibleAlterTarget, setIsVisibleAlterTarget] = useState<boolean>(false)
  const [isVisibleTodo, setIsVisibleToDo] = useState<boolean>(false)
  const toggleVisibilityFormTarget = () => {
    setIsVisibleTarget(!isVisibleTarget);
  };
  const toggleVisibilityFormAlterTarget = () => {
    setIsVisibleAlterTarget(!isVisibleAlterTarget)
  }
  const toggleVisibilityFormToDo = () => {
    setIsVisibleToDo(!isVisibleTodo);
  };
  const [editingTargetId, setEditingTargetId] = useState<number | null>(null);
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
                toDoList={target.todo}
                onClick={toggleVisibilityFormToDo}
                onClickAlterTarget={() => {
                  setEditingTargetId(target.id);
                  toggleVisibilityFormAlterTarget();
                }}
                deleteTarget={() => {DeleteTarget(target.id)}}
              />
              <Form
                cardTitle='New ToDo'
                onSubmit={(event) => {
                  postTodo(event, editingTargetId!)
                }}
                onChangeTitle={(e) => {setTitle(e.target.value)}}
                onChangeDesc={(e) => {setDescription(e.target.value)}}
                valorTitle={title}
                valorDesc={description}
                isVisible={isVisibleTodo}
                onClick={toggleVisibilityFormToDo}
                />
                <Form
                cardTitle='Alter Target'
                onSubmit={(e) => putTarget(e, editingTargetId!, target)}
                onChangeTitle={(e) => {setTitle(e.target.value)}}
                onChangeDesc={(e) => {setDescription(e.target.value)}}
                valorTitle={title}
                valorDesc={description}
                isVisible={isVisibleAlterTarget}
                onClick={toggleVisibilityFormAlterTarget}
                />

            </React.Fragment>
          ))
        ) : (
          <h4>Lista de Targets Vazia...</h4>
        )}
        <Form
        cardTitle='Target'
        onSubmit={(e) => postTarget(e)}
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
