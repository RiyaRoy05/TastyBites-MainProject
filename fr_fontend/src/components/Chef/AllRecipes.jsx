import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChefSidebar from './ChefSidebar';
import { Link } from 'react-router-dom';
import './AllChefRecipes.css';

const baseUrl = 'http://127.0.0.1:8000/api';

function AllRecipes() {
  const [userRecipes, setUserRecipes] = useState([]);
  const [chefRecipes, setChefRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(baseUrl + '/urecipe/');
        setUserRecipes(response.data);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    const fetchChefRecipes = async () => {
      try {
        const response = await axios.get(baseUrl + '/recipe/');
        setChefRecipes(response.data);
      } catch (error) {
        console.error('Error fetching chef recipes:', error);
      }
    };

    fetchUserRecipes();
    fetchChefRecipes();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUserRecipes = userRecipes.filter(urecipe =>
    urecipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChefRecipes = chefRecipes.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container mt-4'>
      <aside className='col-md-3'>
        <ChefSidebar />
      </aside>
      <section className='col-md-9'>
        <div className="card">
          <div className="card-header">All Recipes</div>
          <div className="card-body">
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Search recipes..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="recipe-container">
              {filteredUserRecipes.map((urecipe, index) => (
                <div key={index} className="recipe-card">
                   <Link to={`/chef-userrecipedetails/`+urecipe.id}>
                  <img src={urecipe.featured_img} alt={urecipe.recipe_name} className="recipe-img" />
                  </Link>
                  <div className="recipe-details">
                    <h3 className="recipe-name">{urecipe.recipe_name}</h3>
                  </div>
                </div>
              ))}
              {filteredChefRecipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <Link to={`/chef-recipedetails/`+recipe.id}>
                  <img src={recipe.featured_img} alt={recipe.recipe_name} className="recipe-img" />
                  </Link>
                  <div className="recipe-details">
                    <h3 className="recipe-name">{recipe.recipe_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllRecipes;
