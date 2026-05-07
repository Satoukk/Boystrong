import Header from './header'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'


// タスク作成ページ
function Createtask(){
        const [data, setData] = useState({});
        const [title, setTitle] = useState("");
        const [level, setLevel] = useState(1);
        const navigate = useNavigate();

        const tasklender = () => {
                navigate("/tasklist");
        }
        
        const posttask = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/tasks', {
                title: title,
                level: level
            });
            setData(res.data);
        }catch (error) {
                alert('タスクの追加に失敗しました。再度お試しください。');
        }
}
        return(
                <div className="App">
                        <Header />
                        <div className="loginbody">
                                <div className="form-container">
                                        <h2>タスク追加</h2>
                                        <div className="form-group">
                                                <p>タスク名</p>
                                                <input type="text" onChange={e=>{setTitle(e.target.value)}} placeholder='タスク名を入れて'/>
                                        </div>
                                        <div className="select-group">
                                                <label>レベル</label>
                                                <select onChange={e=>{setLevel(parseInt(e.target.value))}}>
                                                        <option value="1">レベル1</option>
                                                        <option value="2">レベル2</option>
                                                        <option value="3">レベル3</option>
                                                        <option value="4">レベル4</option>
                                                        <option value="5">レベル5</option>
                                                </select>
                                        </div>
                                        <div className="button-group">
                                                <button onClick={posttask}>タスク追加</button>
                                                <button onClick={tasklender}>タスク一覧に戻る</button>
                                                <button onClick={() => navigate('/home')}>ホームに戻る</button>
                                        </div>
                                </div>
                        </div>
                </div>
        )
    }

export default Createtask