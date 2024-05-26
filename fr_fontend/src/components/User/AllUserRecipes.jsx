import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllUserRecipes.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function AllUserRecipes() {
  const [recipeData, setRecipeData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      try {
        axios.get(baseUrl + '/urecipe/')
        .then((response)=>{
        setRecipeData(response.data);
        });
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
  }, []);

  //   const addToWishlist = (recipeId) => {
  //   if (wishlist.includes(recipeId)) {
  //     setWishlist(wishlist.filter(id => id !== recipeId));
  //   } else {
  //     setWishlist([...wishlist, recipeId]);
  //   }
  // };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipeData.filter(urecipe =>
    urecipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
    <aside className='col-md-3'>
      <Sidebar />
    </aside>
    <section className='col-md-9'>
      <div className="card">
        <div className="card-header">All User Recipes</div>
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
            {filteredRecipes.map((urecipe, index) => (
              <div key={index} className="recipe-card">
                <Link to={'/user-allrecipedetails/'+urecipe.id}>
                <img src={urecipe.featured_img} alt={urecipe.recipe_name} className="recipe-img" />
                </Link>
                <div className="recipe-details">
                  <h3 className="recipe-name">{urecipe.recipe_name}</h3>
                  {/* <button1
                    className={wishlist.includes(urecipe.id) ? 'wishlist-btn active' : 'wishlist-btn'}
                    onClick={() => addToWishlist(urecipe.id)}
                    title="Add in your favorite recipe list"
                    type="button"
                  >
                    ❤️
                  </button1> */}
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

export default AllUserRecipes;
