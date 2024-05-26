import React, { useState, useEffect } from 'react';
import './UserProfileSettings.css';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function UserProfileSettings() {
  const [formData, setFormData] = useState({
    'full_name': '',
    'email': '',
    'mobile_no': '',
    'address': '',
    'status':''
    
  });

const user_id = localStorage.getItem('userId')

useEffect(()=>{
  try{
  axios.get(baseUrl+'/user/'+user_id+'/')
  .then((res)=>{
    setFormData({
      full_name:res.data.full_name,
      email:res.data.email,
      mobile_no:res.data.mobile_no,
      address:res.data.address,
      });
  });
}catch(error){
  console.log(error);
}
}, []);

const handleInputChange = (event) => {
  setFormData({
    ...formData,
    [event.target.name]:event.target.value
  });
}

const handleFileChange=(event)=>{
  setFormData({
    ...formData,
    [event.target.name]:event.target.files[0]
  });
}

const submitForm=()=>{
  const chefFormData = new FormData();
  chefFormData.append("full_name", formData.full_name)
  chefFormData.append("email", formData.email)
  chefFormData.append("mobile_no", formData.mobile_no)
  chefFormData.append("address", formData.address)

  try{
    axios.put(baseUrl+'/user/'+user_id+'/', chefFormData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then((response)=>{
        if(response.status==200){
            Swal.fire({
              icon: "success",
              title: "Updated successfully",
              toast:true,
              timer:3000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            });
        }
    });
  }catch(error){
    console.log(error);
    setFormData({'status':'error'})
  }
};


useEffect(()=>{
  document.title='User Profile Settings'
});

const userLoginStatus=localStorage.getItem('userLoginStatus')
if(userLoginStatus!=='true'){
    window.location.href='/user-login';
}

  return (
    <div className="container mt-4">
      <aside className="col-md-3">
        <Sidebar />
      </aside>
      <div className="profile-settings-container">
        <h2>Profile Settings</h2>
        <div className="form-group">
          <label htmlFor="full_name">Full Name:</label>
          <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="mobile_no">Mobile Number:</label>
          <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} />
        </div>
        <button onClick={submitForm} type="button" >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default UserProfileSettings;
