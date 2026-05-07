import Header from './header.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTaskLevel } from './TaskContext.jsx'
import PopUp from './Popup.jsx'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from './api.js'


function Task(){
	const { tasklevel, setCompletedCount } = useTaskLevel();
	const [data, setData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

	useEffect(() => {
    const fetchtask = async () =>{
      try{
        const res = await axios.get(apiUrl(`/api/tasklist/${tasklevel}`));
        setData(Array.isArray(res.data) ? res.data : res.data.tasks || []);
        setCompletedCount(0);
      }catch(error){
        alert('タスクの取得に失敗しました。再度お試しください。');
      }
    }
    fetchtask();
  }, [tasklevel])

  const openPopup = (task) => {
    setSelectedTask(task);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedTask(null);
  };

  const completeTask = () => {
    if (!selectedTask) return;

    setData(prevData => prevData.filter(task => task.id !== selectedTask.id));
    setCompletedCount(prev => (prev || 0) + 1);
    closePopup();
  };

	return(
      <div>
        <Header />
        <div>
          <h2>{tasklevel}</h2>
    
        {data.length === 0 ? (
          <p>データがありません</p>
        ) : (
          data.map((data, index) => (
            <div key={index}>
              <h2>{data.title}</h2>
              <button onClick={() => openPopup(data)}>完了</button>
            </div>
          ))
        )}

      {isPopupVisible && selectedTask && (
        <PopUp onClose={closePopup}>
          <h3>{selectedTask.title}</h3>
          <p>レベル: {selectedTask.level}</p>
          <button onClick={completeTask}>完了して消す</button>
        </PopUp>
      )}
				
        <button onClick={() => navigate('/result')}>終了する</button>
			</div>
		</div>
	)
}

export default Task