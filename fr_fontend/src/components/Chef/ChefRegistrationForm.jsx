import React, {useEffect, useState } from 'react';
import './ChefRegistrationForm.css';
import axios from 'axios';
const baseUrl ='http://127.0.0.1:8000/api/chef/';

function ChefRegistrationForm() {
  const [formData, setFormData] = useState({
    'full_name': '',
    'email': '',
    'password': '',
    'qualification': '',
    'work_experiences': '',
    'mobile_no': '',
    'address': '',
    'status':''
    
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=()=>{
    const chefFormData = new FormData();
    chefFormData.append("full_name", formData.full_name)
    chefFormData.append("email", formData.email)
    chefFormData.append("password", formData.password)
    chefFormData.append("qualification", formData.qualification)
    chefFormData.append("work_experiences", formData.work_experiences)
    chefFormData.append("mobile_no", formData.mobile_no)
    chefFormData.append("address", formData.address)

    try{
      axios.post(baseUrl, chefFormData).then((response)=>{
        setFormData({
          'full_name': '',
          'email': '',
          'password': '',
          'qualification': '',
          'work_experiences': '',
          'mobile_no': '',
          'address': '',
          'status':'success'
        });
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
  if(chefLoginStatus=='true'){
      window.location.href='/chef-dashboard';
  }

  return (
    <div className="chef-registration-container">
      {formData.status==='success' && <p class="text-success">Thanks for your registarion</p>}
      {formData.status==='error' && <p class="text-danger">Registration failed. Please try again</p>}
      <h2>Chef Registration</h2>
      {/* <form onSubmit={submitForm}> */}
        <div className="form-group">
          <label htmlFor="full_name">Full Name:</label>
          <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="work_experiences">Work Experience:</label>
          <input type="text" id="work_experiences" name="work_experiences" value={formData.work_experiences} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_no">Mobile Number:</label>
          <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.skills} onChange={handleInputChange} />
        </div>
        <button type="submit" onClick={submitForm}>Register</button>
      {/* </form> */}
    </div>
  );
}

export default ChefRegistrationForm;
