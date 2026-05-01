import React, { useEffect, useState } from 'react';
import Header from './header.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // ユーザーデータの取得と認証チェック
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        window.location.href = '/';
      } else {
        try {
          const res = await axios.get('http://localhost:8080/api/user/' + userId);
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
    <div>
      <Header />
      <div>
        <p>{data.level}</p>
        <select>
            <option value="level1">レベル1</option>
            <option value="level2">レベル2</option>
            <option value="level3">レベル3</option>
        </select>
        <button onClick={handleStartTask}>漢磨きスタート</button>
        <button onClick={handleCreateTask}>タスク追加</button>
      </div>
    </div>
  );
}

export default Home;