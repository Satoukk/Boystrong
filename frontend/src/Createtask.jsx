import Header from './Header'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


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
                <div>
                        <Header />
                        <input type="text" onChange={e=>{setTitle(e.target.value)}} placeholder='タスク名を入れて'/>
                        <select onChange={e=>{setLevel(e.target.value)}}>
                                <option value="1">レベル1</option>
                                <option value="2">レベル2</option>
                                <option value="3">レベル3</option>
                                <option value="4">レベル4</option>
                                <option value="5">レベル5</option>
                        </select>
                        <button onClick={posttask}>タスク追加</button>
                        <button onClick={tasklender}>タスク一覧</button>
                </div>
        )
    }

export default Createtask