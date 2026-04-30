import React, { useEffect, useState } from 'react';
import Header from './header.jsx';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({});

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

  return (
    <div>
      <Header />
      <div>
        <p>{data.level}</p>
        <button>漢磨きスタート</button>
      </div>
    </div>
  );
}

export default Home;