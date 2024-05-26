import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import './UserChefRecipeView.css';
import { Link, useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function UserChefRecipeView() {
  const [recipeData, setRecipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {recipe_id} = useParams();
  // console.log(recipe_id)
  // const params = useParams()
  // console.log(params)
  const user_id=localStorage.getItem('userId');

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        axios.get(baseUrl + '/recipe/')
        .then((res) =>{
        setRecipeData(res.data);
      });
    } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); 
  }, []);
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipeData.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <aside className='col-md-3'>
        <Sidebar />
      </aside>
      <section className='col-md-9'>
        <div className="card">
          <div className="card-header">Chef Recipes</div>
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
              {filteredRecipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <Link to={`/user-recipedetails/`+recipe.id}>  
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

export default UserChefRecipeView;
