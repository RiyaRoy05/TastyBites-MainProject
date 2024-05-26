import React, {useEffect, useState } from 'react';
import './ChefRegistrationForm.css';
import axios from 'axios';
const baseUrl ='http://127.0.0.1:8000/api';

function ChefLoginForm() {
    const [chefLoginData, setchefLoginData] = useState({
        email:'',
        password:''
    });

    const [errorMsg,setErrorMsg]=useState('');

    const handleChange=(e)=>{
        setchefLoginData({
            ...chefLoginData,
            [e.target.name]:e.target.value
        });
    }

    const submitForm=()=>{
        const ChefFormData=new FormData;
        ChefFormData.append('email',chefLoginData.email)
        ChefFormData.append('password',chefLoginData.password)
        try{
            axios.post(baseUrl+'/chef-login',ChefFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('chefLoginStatus',true);
                    localStorage.setItem('chefId',res.data.chef_id);
                    window.location.href='/chef-dashboard';
                }else{
                  setErrorMsg('Invalid Email or Password!');
                }
              });
        }catch(error){
            console.log(error);
        }
    }

    const chefLoginStatus=localStorage.getItem('chefLoginStatus');
    if(chefLoginStatus=='true'){
        window.location.href='/chef-dashboard';
    }

    useEffect(()=>{
        document.title='Chef Login'
    });

  return (
    <div className="chef-registration-container">
      <h2>Chef Login</h2>
        {errorMsg && <p className='text-danger'>{errorMsg}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={chefLoginData.email} name="email" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={chefLoginData.password} name="password" onChange={handleChange}/>
        </div>
        <button type="submit" onClick={submitForm}>Login</button>
    </div>
  );
}

export default ChefLoginForm;
