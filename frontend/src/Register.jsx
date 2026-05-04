import { React, useState } from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import App from './App.jsx'
import Header from './header.jsx'
import axios from 'axios'
import './App.css'

function Register() {
    const [username,setuserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    //登録処理
    const handlerRegister = async(e) =>{
        e.preventDefault();
        try{
        const res = await axios.post('http://localhost:8080/api/CreateUser',{
            name: username.trim(),
            email: email.trim(),
            password: password.trim(),
            level: 1
        })
            const data = res.data
            alert('登録成功')
            navigate('/')
        }catch(error){
             alert('登録失敗')
    }
}
    return(
        <div className="App">
            <Header />
            <div className="loginbody">
                <div className="form-container">
                    <h2>新規登録</h2>
                    <div className="form-group">
                        <p>ユーザー名</p>
                        <input type="text"  onChange={e=>setuserName(e.target.value)} placeholder="ユーザー名を入力してください" />
                    </div>
                    <div className="form-group">
                        <p>メールアドレス</p>
                        <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="メールアドレスを入力してください" />
                    </div>
                    <div className="form-group">
                        <p>パスワード</p>
                        <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="パスワードを入力してください" />    
                    </div>
                    <button onClick={handlerRegister}>登録</button>
                    <p>すでにアカウントをお持ちの方は<Link to="/">こちら</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register