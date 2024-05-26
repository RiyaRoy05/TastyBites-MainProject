import React, { useState, useEffect } from 'react';
import ChefSidebar from './ChefSidebar';
import axios from 'axios';
import './ChefDashboard.css';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChefDashboard() {
  const [chefInfo, setChefInfo] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefInfo = async () => {
      try {
        const chefResponse = await axios.get(`${baseUrl}/chef/${localStorage.getItem('chefId')}/`);
        setChefInfo(chefResponse.data);

        const recipesResponse = await axios.get(`${baseUrl}/chef-recipes/${localStorage.getItem('chefId')}`);
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
        <ChefSidebar />
      </aside>
      <section className='col-md-9'>
        <div className="dashboard-content">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {chefInfo && (
            <div className="chef-info">
              <h1 className="welcome-message">Welcome {chefInfo.full_name}</h1>
              {chefInfo.profile_image && (
                <img src={chefInfo.profile_image} alt="Chef Profile" className="profile-image" />
              )}
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

export default ChefDashboard;
