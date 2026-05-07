import React, { useEffect, useState } from 'react';
import Header from './header.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTaskLevel } from './TaskContext.jsx';
import { apiUrl } from './api.js';

function Home() {
  const [data, setData] = useState({});
  const { tasklevel, setTasklevel } = useTaskLevel();
  const navigate = useNavigate();
  // ユーザーデータの取得と認証チェック
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        window.location.href = '/';
      } else {
        try {
          const res = await axios.get(apiUrl('/api/user/' + userId));
          setData(res.data);
        } catch (error) {
          alert('認証に失敗しました。再度ログインしてください。');
          window.location.href = '/';
        }
      }
    };
    fetchUser();
  }, []);

    const handleStartTask = () => {
        navigate("/task");
    }
    const handleCreateTask = () => {
        navigate("/Createtask");
    }

  return (
    <div className="App">
      <Header />
      <div className="loginbody">
        <div className="form-container">
          <h2>テストステロンをあげろ！！！{data.name}!!</h2>
          <div className="form-group">
            <p>現在のレベル: <strong>{data.level}</strong></p>
          </div>
          <div className="select-group">
            <label>レベルを選択</label>
            <select value={tasklevel} onChange={(e) => setTasklevel(e.target.value)}>
                <option value="1">レベル1</option>
                <option value="2">レベル2</option>
                <option value="3">レベル3</option>
                <option value="4">レベル4</option>
                <option value="5">レベル5</option>
            </select>
          </div>
          <div className="button-group">
            <button onClick={handleStartTask}>漢磨きスタート</button>
            <button onClick={handleCreateTask}>タスク追加</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;