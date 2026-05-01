import React from 'react';
import Header from './Header'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Tasklist(){
        const [tasks, setTasks] = useState([]);
        const [level, setLevel] = useState('1');

        const fetchTasks = async () => {
                try {
                        const res = await axios.get(`http://localhost:8080/api/tasks/${level}`);
                        setTasks(res.data.tasks);
                } catch (error) {
                        console.error('Error fetching tasks:', error);
                }
        };

        useEffect(() => {
                fetchTasks();
        }, [level]);

        return(
                <div>
                        <Header />
                        <h2>タスク一覧</h2>
                        <select name="level" onChange={e=>{setLevel(e.target.value)}}>
                                <option value="1">レベル1</option>
                                <option value="2">レベル2</option> 
                                <option value="3">レベル3</option>
                                <option value="4">レベル4</option>
                                <option value="5">レベル5</option>
                        </select>

                        {tasks.map((task) => (
                                <div key={task.id}>
                                        <h3>{task.title}</h3>
                                        <p>レベル: {task.level}</p>
                                </div>
                        ))}

                </div>
        )
    }   

export default Tasklist