import { use, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Register from './Register.jsx'
import { useNavigate } from 'react-router-dom'
import Header from './header.jsx'
import axios from 'axios'


function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginext = () => {
    navigate('/register')
  }

  const handlelogin = async(e)=>{
    e.preventDefault();
    try{
    const res = await axios.get('http://localhost:8080/login', {
        id
    })
      localStorage.setItem('userId', data.user.id);
      alert('ログイン成功');
      loginext()
  }catch(error){
      alert('ログイン失敗')
    }
    
   
  }
 
  return(
    
    <div className="App">
      <Header />
      <div className="loginbody">
        <p>ユーザー名</p>
        <input type="text" onChange={e=>setUsername(e.target.value)} placeholder="ユーザー名を入力してください" />
        <p>メールアドレス</p>
        <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="メールアドレスを入力してください" />
        <p>パスワード</p>
        <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="パスワードを入力してください" />

        <button onClick={handlelogin}>ログイン</button>
        <p>アカウントをお持ちでない方は<Link to="./register">こちら</Link></p>
      </div>
    </div>
  )
}
export default App
