import React from 'react';
import Header from './Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function Tasklist(){
        const [tasks, setTasks] = useState([]);
        const [level, setLevel] = useState('1'); 

   useEffect(()=>{
        const fetchTasks = async () => {
                try {
                        const res = await axios.get(`http://localhost:8080/api/tasklist/${level}`);
                        setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
                } catch (error) {
                        console.error('Error fetching tasks:', error);
                }
           };  
           fetchTasks();
        }, [level]);

        return(
                <div className="App">
                        <Header />
                        <div className="loginbody">
                                <div className="tasklist-content">
                                        <h2>タスク一覧</h2>
                                        <div className="select-group" style={{marginBottom: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
                                                <label>レベルを選択</label>
                                                <select name="level" onChange={e=>{setLevel(e.target.value)}}>
                                                        <option value="1">レベル1</option>
                                                        <option value="2">レベル2</option> 
                                                        <option value="3">レベル3</option>
                                                        <option value="4">レベル4</option>
                                                        <option value="5">レベル5</option>
                                                </select>
                                        </div>

                                        <div className="tasks-grid">
                                                {tasks.map((task) => (
                                                        <div key={task.id} className="task-card">
                                                                <h3>{task.title}</h3>
                                                                <p><span className="level-badge">レベル {task.level}</span></p>
                                                        </div>
                                                ))}
                                                {tasks.length === 0 && <p style={{textAlign: 'center', color: '#999'}}>タスクがありません</p>}

                                                <button onClick={() => window.location.href = '/home'} style={{marginTop: '20px'}}>ホームに戻る</button>
                                                <button onClick={() => window.location.href = '/Createtask'} style={{marginTop: '20px', marginLeft: '10px'}}>タスク追加</button>
                                        </div>
                                </div>
                        </div>
                </div>
        )
    }   

export default Tasklist