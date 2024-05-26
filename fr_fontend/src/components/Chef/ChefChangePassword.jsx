import React, { useState, useEffect } from 'react';
import './ChefChangePassword.css'; 
import ChefSidebar from './ChefSidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChefChangePassword() {
  const [formData, setFormData] = useState({
    'password': ''
    
  });

  const chef_id = localStorage.getItem('chefId')

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
      axios.post(baseUrl+'/chef/change-password/'+chef_id+'/', chefFormData).then((response)=>{
          if(response.status==200){
            window.location.href='/chef-logout';
          }
      });
    }catch(error){
      console.log(error);
      setFormData({'status':'error'})
    }
  };

  useEffect(()=>{
    document.title='Chef Change Password'
});

  const chefLoginStatus=localStorage.getItem('chefLoginStatus')
  if(chefLoginStatus!=='true'){
      window.location.href='/chef-login';
  }

  return (
    <div className='container mt-4'>
      <aside className='col-md-3'>
        <ChefSidebar />   
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

export default ChefChangePassword;
