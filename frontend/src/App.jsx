import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlelogin = async(e)=>{
    e.preventDefault();
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    const data = await res.json()
    console.log(data)
  }
 
  return(
    <div className="App">
      <h1>漢磨き</h1>
      <p>ユーザー名</p>
      <input type="text" onChange={e=>setUsername(e.target.value)} placeholder="ユーザー名を入力してください" />
      <p>メールアドレス</p>
      <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="メールアドレスを入力してください" />
      <p>パスワード</p>
      <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="パスワードを入力してください" />

      <button onClick={handlelogin}>ログイン</button>
    
    </div>
  )
}
export default App
