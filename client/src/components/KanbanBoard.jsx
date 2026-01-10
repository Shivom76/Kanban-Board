import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate=useNavigate()
    const token = localStorage.getItem('token');
    const url = 'https://kanban-board-a4aw.vercel.app';
    
    // Local host url (comment later)
    // const url="http://localhost:9090"

    // 1. Fetch Tasks on Load
    useEffect(() => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken){
            navigate("/login")
            return;
        }

        fetch(`${url}/api/todos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.allTodos)) {
                setTasks(data.allTodos);
            }
        })
        .catch(err => console.error(err));
    }, [token]);

    // 2. Add Task
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue && !currentToken) return;

        try {
            const response = await fetch(`${url}/api/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: inputValue })
            });
            const data = await response.json();
            const newTask = data.todo || data; 
            setTasks(prev => [...prev, newTask]);
            setInputValue('');
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    // 3. Delete Task
    const deleteTask = (id) => {
        fetch(`${url}/api/todos/del/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.ok) {
                setTasks(tasks.filter(task => task._id !== id));
            }
        });
    };

    // 4. Drag and Drop Logic
    const onDragStart = (e, id) => {
        e.dataTransfer.setData("taskId", id);
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const onDrop = (e, newStatus) => {
        e.preventDefault()
        const id = e.dataTransfer.getData("taskId");
        
        // Optimistic UI update: change state immediately
        const updatedTasks = tasks.map(t => 
            t._id === id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks);

        // Update Backend
        fetch(`${url}/api/todos/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });
    };

    // Not using this 
    const renderColumn = (status, title) => (
        <div 
            id={status} 
            className="box" 
            onDragOver={onDragOver} 
            onDrop={(e) => onDrop(e, status)}
        >
            <h2>{title}</h2>
            {tasks.filter(t => t.status === status || (!t.status && status === 'todo')).map(task => (
                <div 
                    key={task._id} 
                    className="dragItems" 
                    draggable 
                    onDragStart={(e) => onDragStart(e, task._id)}
                >
                    {task.content}
                    <button className="crossBtn" onClick={() => deleteTask(task._id)}>X</button>
                </div>
            ))}
        </div>
    );


    const clearAll=()=>{
        setTasks([])

        fetch(`${url}/api/todos/clearAll`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
    }


    // For rendering the columns
    const todoTasks = tasks.filter(t => t.status === 'todo');
    const ongoingTasks = tasks.filter(t => t.status === 'ongoing');
    const completedTasks = tasks.filter(t => t.status === 'completed');


    return (
        <>
            <div className="container">
            {/* TO DO COLUMN */}
                <div id="col1">
                    <h2>To-Do</h2>
                    <div className="box todo" onDragOver={onDragOver} onDrop={(e)=>onDrop(e,'todo')}>
                        {todoTasks.map(task => (
                        <div key={task._id} className="dragItems" draggable="true" onDragStart={(e)=>onDragStart(e,task._id)}>{task.content}<button className="crossBtn" onClick={() => deleteTask(task._id)}>X</button></div>
                        ))}
                    </div>
                </div>

                {/* ONGOING COLUMN */}
                <div id="col2">
                    <h2>Ongoing...</h2>
                    <div className="box ongoing" onDragOver={onDragOver} onDrop={(e)=>onDrop(e,'ongoing')}>
                        {ongoingTasks.map(task => (
                        <div key={task._id} className="dragItems" draggable="true" onDragStart={(e)=>onDragStart(e,task._id)}>{task.content}<button className="crossBtn" onClick={() => deleteTask(task._id)}>X</button></div>
                        ))}
                    </div>
                </div>

                {/* COMPLETED COLUMN */}
                <div id="col3">
                    <h2>Completed</h2>
                    <div className="box completed" onDragOver={onDragOver} onDrop={(e)=>onDrop(e,'completed')}>
                        {completedTasks.map(task => (
                        <div key={task._id} className="dragItems" draggable="true" onDragStart={(e)=>onDragStart(e,task._id)}>{task.content}<button className="crossBtn" onClick={() => deleteTask(task._id)}>X</button></div>
                        ))}
                    </div>
                </div> 


                {/* {renderColumn('todo', 'To-Do')}
                {renderColumn('ongoing', 'Ongoing...')}
                {renderColumn('completed', 'Completed')} */}
            </div>

            <div className="formElement">
                <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Todo Task" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="p-4"
                />
                <button type="submit" className="flex items-center bg-orange-800 text-white opacity-80 hover:translate-y-[-3px] hover:opacity-100">Enter</button>
                </form>
                <div className="clearDiv flex justify-center ">
                <button className="clearBtn  flex items-center bg-red-600 text-white opacity-80 hover:translate-y-[-3px] hover:opacity-100" onClick={clearAll}>Clear All Todos</button>
                </div>
            </div>

            {/* <div className="formElement">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        placeholder="Todo Task" 
                    />
                    <button type="submit">Enter</button>
                </form>
            </div> */}
        </>
    );
};

export default KanbanBoard;