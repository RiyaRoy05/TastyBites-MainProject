import React, {useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl ='http://127.0.0.1:8000/api';

function UserLoginForm() {
    const [userLoginData, setuserLoginData] = useState({
        email:'',
        password:''
    });

    const [errorMsg,setErrorMsg]=useState('');

    const handleChange=(e)=>{
        setuserLoginData({
            ...userLoginData,
            [e.target.name]:e.target.value
        });
    }

    const submitForm=()=>{
        const UserFormData=new FormData;
        UserFormData.append('email',userLoginData.email)
        UserFormData.append('password',userLoginData.password)
        try{
            axios.post(baseUrl+'/user-login',UserFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('userLoginStatus',true);
                    localStorage.setItem('userId',res.data.user_id);
                    window.location.href='/user-dashboard';
                }else{
                  setErrorMsg('Invalid Email or Password!');
                }
              });
        }catch(error){
            console.log(error);
        }
    }

    const userLoginStatus=localStorage.getItem('userLoginStatus');
    if(userLoginStatus=='true'){
        window.location.href='/user-dashboard';
    }

    useEffect(()=>{
        document.title='User Login'
    });

  return (
    <div className="chef-registration-container">
      <h2>User Login</h2>
        {errorMsg && <p className='text-danger'>{errorMsg}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={userLoginData.email} name="email" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={userLoginData.password} name="password" onChange={handleChange}/>
        </div>
        <button type="submit" onClick={submitForm}>Login</button>
    </div>
  );
}

export default UserLoginForm;
