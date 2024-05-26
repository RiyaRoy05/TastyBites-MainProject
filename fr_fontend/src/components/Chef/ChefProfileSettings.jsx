import React, { useState, useEffect } from 'react';
import './ChefProfileSettings.css';
import ChefSidebar from './ChefSidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChefProfileSettings() {
  const [formData, setFormData] = useState({
    'full_name': '',
    'email': '',
    'qualification': '',
    'work_experiences': '',
    'mobile_no': '',
    'address': '',
    'prev_img':'',
    'profile_image':'',
    'status':''
    
  });

  const chef_id = localStorage.getItem('chefId')

  useEffect(()=>{
    try{
    axios.get(baseUrl+'/chef/'+chef_id+'/')
    .then((res)=>{
      setFormData({
        full_name:res.data.full_name,
        email:res.data.email,
        qualification:res.data.qualification,
        work_experiences:res.data.work_experiences,
        mobile_no:res.data.mobile_no,
        address:res.data.address,
        prev_img:res.data.profile_image,
        profile_image:'',
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
    chefFormData.append("qualification", formData.qualification)
    chefFormData.append("work_experiences", formData.work_experiences)
    chefFormData.append("mobile_no", formData.mobile_no)
    chefFormData.append("address", formData.address)
    if(formData.profile_image!==''){
      chefFormData.append('profile_image',formData.profile_image, formData.profile_image.name);
      }

    try{
      axios.put(baseUrl+'/chef/'+chef_id+'/', chefFormData,{
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
    document.title='Chef Register'
});

  const chefLoginStatus=localStorage.getItem('chefLoginStatus')
  if(chefLoginStatus!=='true'){
      window.location.href='/chef-login';
  }
  
  return (
    <div className="container mt-4">
      <aside className="col-md-3">
        <ChefSidebar />
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
          <label htmlFor="profile_image">Profile Image:</label>
          <input type="file" id="profile_image" name="profile_image" className="form-control-file" onChange={handleFileChange} />
            <img
              className='mt-2' controls width='30%'
              src={formData.prev_img} />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_no">Mobile Number:</label>
          <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="work_experiences">Work Experiences:</label>
          <textarea id="work_experiences" name="work_experiences" value={formData.work_experiences} onChange={handleInputChange}></textarea>
        </div>
        <button onClick={submitForm} type="button" >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ChefProfileSettings;
