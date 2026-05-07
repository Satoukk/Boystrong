import React from 'react';
import { useTaskLevel } from './TaskContext.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';

export default function Result() {
  const { completedCount, setCompletedCount } = useTaskLevel();
  const [data, setData] = useState(null);
  const [updatedLevel, setUpdatedLevel] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleNext = async () => {
    if (!data || isUpdating) return;

    const nextLevel = Number(data.level || 0) + Number(completedCount || 0);
    setIsUpdating(true);

    try {
      const res = await axios.put(`http://localhost:8080/api/user/${data.id}`, {
        level: nextLevel,
      });
      setUpdatedLevel(res.data.level);
      setCompletedCount(0);
      setData((current) => ({ ...current, level: res.data.level }));
    } catch (error) {
      alert('レベル更新に失敗しました。再度お試しください。');
    } finally {
      setIsUpdating(false);
    }
  };

	return (
		<div>
			<Header />
			<div style={{ padding: 20 }}>
				<h2>完了したタスク数</h2>
				<p>{completedCount || 0} 件</p>
				<p>現在のレベル: {data?.level ?? 0}</p>
				{updatedLevel !== null && <p>上がったレベル: {updatedLevel}</p>}
        {updatedLevel === null ? (
          <button onClick={handleNext} disabled={isUpdating || !data}>次へ</button>
        ) : (
          <button onClick={() => window.location.href = '/home'}>ホームへ</button>
        )}
			</div>
		</div>
	);
}

