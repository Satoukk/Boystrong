import { react, useEffect } from 'react'
import Header from './header.jsx'
import {useEffect}  from 'react'
function Home(){

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          // ユーザーIDが存在しない場合、ログインページにリダイレクト
          window.location.href = '/';
        }else{
            fetch('http://localhost:8080/api/user',{
            me
            })
        }

        }, []);
    return(
       <div>
            <Header />
            
       </div>
    )
}