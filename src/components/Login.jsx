import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


function Login() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  const navigate = useNavigate(); 


  function handleUsername(e) { 
       console.log(e.target.value)
      setUsername(e.target.value);   
  }
  function handlePassword(e) { 
    console.log(e.target.value)
    setPassword(e.target.value);   
}


async function handleSubmit(e) {
  e.preventDefault();  


  try {
    const response = await axios.post('http://localhost:8080/login', {
      username: username,
      password: password
    });
    
    // 로그인 성공 시, 서버에서 반환된 토큰 혹은 세션 정보 처리
    console.log('Login successful', response);

  
  
    
    // 로그인 후 홈 페이지로 리디렉션
    navigate('/');  // '/home'으로 페이지 리디렉션
  } catch (error) {
    console.error('Login failed', error);
  
  }




}





  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
      <input type='text' id="username" name="username" placeholder='username' value={username} onChange={handleUsername} />
       </div>
       <div>
      <input type='password' id="password" name="password" placeholder='password' value={password} onChange={handlePassword}  />
       </div>
      <button type='submit'>Login</button>
      </form>



    </div>
  );
}

export default Login; 