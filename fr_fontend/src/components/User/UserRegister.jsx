import React, {useEffect, useState } from 'react';
import axios from 'axios';
import './UserRegister.css';
const baseUrl ='http://127.0.0.1:8000/api/user/';

function UserRegister() {
    const [userData, setUserData] = useState({
        'full_name': '',
        'email': '',
        'password': '',
        'mobile_no': '',
        'address': '',
        'status':''       
      });

      const handleChange = (event) => {
        setUserData({
          ...userData,
          [event.target.name]:event.target.value
        });
      }

      const submitForm=()=>{
        const userFormData = new FormData();
        userFormData.append("full_name", userData.full_name)
        userFormData.append("email", userData.email)
        userFormData.append("password", userData.password)
        userFormData.append("mobile_no", userData.mobile_no)
        userFormData.append("address", userData.address)
    
        try{
          axios.post(baseUrl, userFormData).then((response)=>{
            setUserData({
              'full_name': '',
              'email': '',
              'password': '',
              'mobile_no': '',
              'address': '',
              'status':'success'
            });
          });
        }catch(error){
          console.log(error);
          setUserData({'status':'error'})
        }
      };

      useEffect(()=>{
        document.title='User Register'
    });

    return (
        <div className="chef-registration-container">
            {userData.status==='success' && <p class="text-success">Thanks for your registarion</p>}
            {userData.status==='error' && <p class="text-danger">Registration failed. Please try again</p>}
        <h2>User Registration</h2>
          <div className="form-group">
            <label htmlFor="full_name">Full Name:</label>
            <input type="text" id="full_name" name="full_name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_no">Mobile Number:</label>
            <input type="text" id="mobile_no" name="mobile_no" onChange={handleChange} required  />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" onChange={handleChange} required />
          </div>
          <button onClick={submitForm} type="submit">Register</button>
      </div>
    );
};

export default UserRegister;
