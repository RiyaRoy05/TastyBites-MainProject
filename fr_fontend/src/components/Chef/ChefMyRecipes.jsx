import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import ChefSidebar from './ChefSidebar';
import { useState, useEffect } from 'react';
import './ChefDashboard.css';  
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChefMyRecipes() {
  const [recipeData,setRecipeData]=useState([]);

  const chef_id=localStorage.getItem('chefId');
  // const {chefId} = useParams();
  console.log(chef_id);

      useEffect(()=>{
        try{
        axios.get(baseUrl+'/chef-recipes/'+chef_id)
        .then((res)=>{
          setRecipeData(res.data);
        });                                                  
    }catch(error){
      console.log(error);
    } 
},[]);

// const Swal = require( 'sweetalert2' )
const handleDeleteClick = (recipe_id) =>{
  Swal.fire({
    title: 'Confirm',
    text: 'Are you Sure Want to Delete?',
    icon: 'info',
    confirmButtonText: 'Continue',
    showCancelButton: true
  }).then((result)=>{
    if(result.isConfirmed){
      try{
        axios.delete(baseUrl+'/edit-recipe/'+recipe_id+'/')
        .then((res)=>{
          Swal.fire('success','Data has been deleted.');
          try{
            axios.get(baseUrl+'/chef-recipes/'+chef_id)
            .then((res)=>{
              setRecipeData(res.data);
            });                                                  
        }catch(error){
          console.log(error);
        }
        });
      }catch(error){
        Swal.fire('error','Data has not been deleted!!');
      }
    }else{
      Swal.fire('error','Data has not been deleted!!');
    }
  });
}

  return (
    <div className='container mt-4'>
        <aside className='col-md-3'>
        <ChefSidebar />   
        </aside>  
        <section className='col-md-9'>
          <div className="card">
            <div className="card-header">My Recipes</div>
            <div className="card-body">
              <div className="table-responsive">
                <table  className="table-row text-center">
                  <thead className='table-header'>
                    <tr>
                      <th className="table-cell">Name</th>
                      <th className="table-cell">Image</th>
                      <th className="table-cell">Action</th>
                    </tr>
                  </thead>
                
                <tbody>
                  {recipeData.map((recipe,index) =>  
                  <tr>
                      <td className="table-cell">{recipe.recipe_name}</td>
                      <td className="table-cell"><img src={recipe.featured_img} width="80" className='round' alt={recipe.recipe_name} /></td>
                      <td className="table-cell">
                      <Link to={`/chef-recipe-edit/`+recipe.id} className="btn"><i className="bi bi-pencil-square"></i></Link>
                        <button className='btn2' onClick={() =>handleDeleteClick(recipe.id)}><i class="bi bi-trash"></i></button>
                      </td>
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

export default ChefMyRecipes;
