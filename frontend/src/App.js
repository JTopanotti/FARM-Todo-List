import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoListView from './components/TodoListView';

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
      .then(res => {
        setTodoList(res.data);
      })
  });

  const addTodoHandler = () => {
    console.log(title + " : " + description);
    axios.post('http://localhost:8000/api/todo', {
      'title': title, 'description': description
    }).then(res => console.log(res));
  };


  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto"
          style={{"width":"400px", "backgroundColor":"white", "marginTop": "15px"}}>
      <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">FastAPI - React - MongoDB</h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
        <span className="card-text">
          <input className="mb-2 form-control titleIn" placeholder="Title" onChange={event => setTitle(event.target.value)}/>
          <input className="mb-2 form-control desIn" placeholder="Description" onChange={event => setDescription(event.target.value)}/>
          <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px', 'fontWeight': 'bold'}} onClick={addTodoHandler}>Add Task</button>
        </span>
        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
        <div>
          <TodoListView todoList={todoList} />
        </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">Copyright 2021, All rights reserved &copy;</h6>
    </div>
  );
}

export default App;
