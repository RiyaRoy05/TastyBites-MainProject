import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import ChefSidebar from './ChefSidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ChefDashboard.css';  
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';


function ChefRecipeEdit() {
  const chef_id=localStorage.getItem('chefId');

  const [recipeData,setRecipeData]=useState({
    chef:'',
    recipe_name:'',
    prev_img:'',
    featured_img:'',
    recipe_description:'',
    ingredients:''
  });

  const handleChange=(event)=>{
    setRecipeData({
      ...recipeData,
      [event.target.name]:event.target.value
      });
    }

  const handleFileChange=(event)=>{
    setRecipeData({
      ...recipeData,
      [event.target.name]:event.target.files[0]
    });
  }

  const {recipe_id} = useParams(); 
  const formSubmit=()=>{
    const _formData=new FormData();
    // _formData.append('id',recipe_id);
    _formData.append('chef',chef_id);
    _formData.append('recipe_name',recipeData.recipe_name);
    if(recipeData.featured_img!==''){
      _formData.append('featured_img',recipeData.featured_img, recipeData.featured_img.name);
      }
      _formData.append('recipe_description',recipeData.recipe_description);
      _formData.append('ingredients',recipeData.ingredients);

    try{
      axios.put(baseUrl+'/edit-recipe/'+recipe_id+'/',_formData,{
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((res)=>{
        if(res.status===200){
          const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Updated successfully"
            });
      }
      // window.location.href='/add-chapter/1';
  });
    }catch(error){
      console.log(error);
    }

};

useEffect(()=>{
  try{
  axios.get(baseUrl+'/recipe/'+recipe_id+'/')
  .then((res)=>{
    setRecipeData({
      chef:res.data.chef,
      recipe_name:res.data.recipe_name,
      prev_img:res.data.featured_img,
      recipe_description:res.data.recipe_description,
      ingredients:res.data.ingredients,
      featured_img:'',
      });
  });
}catch(error){
  console.log(error);
}
}, []);

  return (
    <div className='mt-4'>
      <div className="row">
        <aside className='col-md-3'>
          <ChefSidebar />
        </aside>
          <section className="col-md-9">
            <div className='mt-1'></div>
            <h2>Update Recipe</h2>           
              
              <div className="form-group">
                <label htmlFor="recipe_name">Recipe Name:</label>
                <input type="text" value={recipeData.recipe_name} className="form-control" onChange={handleChange} name="recipe_name" id="recipe_name" />
              </div>
              <div className="form-group">
                <label htmlFor="featured_img">Food Image:</label>
                <input type="file" id="featured_img" name="featured_img" className="form-control-file" onChange={handleFileChange} />
                <img
                  className='mt-2' controls width='30%'
                  src={recipeData.prev_img} />
                </div>
              <div className="form-group">
                <label htmlFor="recipe_description">Recipe Description:</label>
                <textarea id="recipe_description" name="recipe_description" className="form-control" value={recipeData.recipe_description} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea id="ingredients" name="ingredients" className="form-control" value={recipeData.ingredients} onChange={handleChange}></textarea>
              </div>
              <button type="submit" onClick={formSubmit} className="btn btn-primary">Update Recipe</button>

        </section>
      </div>
    </div>
  )
}

export default ChefRecipeEdit;