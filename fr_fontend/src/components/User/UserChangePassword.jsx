import React, { useState, useEffect } from 'react';
import './UserChangePassword.css'; 
import Sidebar from './Sidebar';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function UserChangePassword() {
  const [formData, setFormData] = useState({
    'password': ''
    
  });

  const user_id = localStorage.getItem('userId')

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=()=>{
    const chefFormData = new FormData();
    chefFormData.append("password", formData.password)

    try{
      axios.post(baseUrl+'/user/change-password/'+user_id+'/', chefFormData).then((response)=>{
          if(response.status==200){
            window.location.href='/user-logout';
          }
      });
    }catch(error){
      console.log(error);
      setFormData({'status':'error'})
    }
  };

  useEffect(()=>{
    document.title='User Change Password'
});

  const userLoginStatus=localStorage.getItem('userLoginStatus')
  if(userLoginStatus!=='true'){
      window.location.href='/user-login';
  }


  return (
    <div className='container mt-4'>
    <aside className='col-md-3'>
      <Sidebar />   
    </aside> 
    <div className="change-password-container">
      <h2>Change Password</h2>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input type="text" id="password" name="password" value={formData.password} onChange={handleInputChange} required  />
        </div>
        <button type="submit"onClick={submitForm}>Update Password</button>
    </div>
  </div>
  );
}

export default UserChangePassword;
