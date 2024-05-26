import React from 'react';
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './UserDashboard.css'; 
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function FavoriteRecipes() {
  const [recipeData,setRecipeData]=useState([]);
  const [chefrecipeData,setChefRecipeData]=useState([]);

  const user_id=localStorage.getItem('userId');
  // const {chefId} = useParams();
  console.log(user_id);

      useEffect(()=>{
      
        // FETCH WISHLISTED USER RECIPES
        try{
        axios.get(baseUrl+'/user-favorite-recipes/'+user_id)
        .then((res)=>{
          setRecipeData(res.data);
        });                                                  
    }catch(error){
      console.log(error);
    } 

    // FETHC WISHLISTED CHEF RECIPES

    try{
      axios.get(baseUrl+'/user-cheffavorite-recipes/'+user_id)
      .then((res)=>{
        setChefRecipeData(res.data);
      });                                                  
  }catch(error){
    console.log(error);
  } 

},[]);

  return (
    <div className='container mt-4'>
        <aside className='col-md-3'>
        <Sidebar />   
        </aside>  
        <section className='col-md-9'>
          <div className="card">
            <div className="card-header">Favorite Recipes</div>
            <div className="card-body">
              <div className="table-responsive">
                <table  className="table-row text-center">
                  <thead className='table-header'>
                    <tr>
                      <th className="table-cell">Name</th>
                      <th className="table-cell">Image</th>
                    </tr>
                  </thead>
                
                <tbody>
                  {recipeData.map((row,index) =>  
                  <tr>
                      <td className="table-cell">{row.recipe.recipe_name}</td>
                      <td className="table-cell"><Link to={'/user-allrecipedetails/'+row.recipe.id}><img src={row.recipe.featured_img} width="80" className='round' alt={row.recipe.recipe_name} /> </Link></td>
                  </tr>
                  )}
                  {chefrecipeData.map((row,index) =>  
                  <tr>
                      <td className="table-cell">{row.recipe.recipe_name}</td>
                      <td className="table-cell"> <Link to={`/user-recipedetails/`+row.recipe.id}>  
                      <img src={row.recipe.featured_img} width="80" className='round' alt={row.recipe.recipe_name} /></Link></td>
                  </tr>
                  )}
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default FavoriteRecipes;
