import Header from './Header'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Task(){
	const [data, setData] = useState({});

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
	return(
		<div>
			<Header />
			<div>
				<h2>タスク</h2>
				
			</div>
		</div>
	)
}

export default Task