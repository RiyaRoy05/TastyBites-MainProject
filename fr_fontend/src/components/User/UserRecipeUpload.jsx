import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './UserRecipeUpload.css'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function UserRecipeUpload() {
  const [recipeData,setRecipeData]=useState({
    recipe_name:'',
    featured_img:'',
    recipe_description:'',
    ingredients:''
  });

  const user_id = localStorage.getItem('userId')

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

  // const {chef_id}=useParams();
  console.log(user_id)

  const formSubmit=()=>{
    const _formData=new FormData();
    _formData.append('user',user_id);
    _formData.append('recipe_name',recipeData.recipe_name);
    _formData.append('featured_img',recipeData.featured_img,recipeData.featured_img.name);
    _formData.append('recipe_description',recipeData.recipe_description);
    _formData.append('ingredients',recipeData.ingredients);
    try{
      axios.post(baseUrl+'/urecipe/',_formData,{
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((res)=>{
        console.log(res.data);
        window.location.href='/my-recipes';
      });
    }
    catch(error){
      console.log(error);
    }

};



  return (
    <div className='mt-4'>
      <div className="row">
        <aside className='col-md-3'>
          <Sidebar />
        </aside>
          <section className="col-md-9">
            <div className='mt-1'></div>
            <h2>Add Recipe</h2>
              <div className="form-group">
                <label htmlFor="recipe_name">Recipe Name:</label>
                <input type="text" id="recipe_name" name="recipe_name" className="form-control" value={recipeData.recipe_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="featured_img">Food Image:</label>
                <input type="file" id="featured_img" name="featured_img" className="form-control-file" onChange={handleFileChange} />
              </div>
              <div className="form-group">
                <label htmlFor="recipe_description">Recipe Description:</label>
                <textarea id="recipe_description" name="recipe_description" className="form-control" value={recipeData.recipe_description} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea id="ingredients" name="ingredients" className="form-control" value={recipeData.ingredients} onChange={handleChange}></textarea>
              </div>
              <button type="submit" onClick={formSubmit} className="btn btn-primary">Add Recipe</button>
        </section>
      </div>
    </div>
  );
}

export default UserRecipeUpload;
