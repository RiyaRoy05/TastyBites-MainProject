import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import './UserDashboard.css'; 

const baseUrl = 'http://127.0.0.1:8000/api';

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefInfo = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/user/${localStorage.getItem('userId')}/`);
        setUserInfo(userResponse.data);

        const recipesResponse = await axios.get(`${baseUrl}/user-recipes/${localStorage.getItem('userId')}`);
        setTotalRecipes(recipesResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChefInfo();
  }, []);
  
  return (
    <div className="container mt-4">
      <aside className='col-md-3'>
        <Sidebar />
      </aside>
      <section className='col-md-9'>
        <div className="dashboard-content">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {userInfo && (
            <div className="chef-info">
              <h1 className="welcome-message">Welcome {userInfo.full_name}</h1>
              <div className="recipe-count-box">
                <p className="recipe-count-label">  Your Recipes</p>
                <p className="recipe-count">{totalRecipes}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
