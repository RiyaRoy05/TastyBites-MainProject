import React from 'react';
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './UserDashboard.css'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function MyRecipes() {
  const [recipeData,setRecipeData]=useState([]);

  const user_id=localStorage.getItem('userId');
  // const {chefId} = useParams();
  console.log(user_id);

      useEffect(()=>{
        try{
        axios.get(baseUrl+'/user-recipes/'+user_id)
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
        axios.delete(baseUrl+'/edit-urecipe/'+recipe_id+'/')
        .then((res)=>{
          Swal.fire('success','Data has been deleted.');
          try{
            axios.get(baseUrl+'/user-recipes/'+user_id)
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
        <Sidebar />   
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
                  {recipeData.map((urecipe,index) =>  
                  <tr>
                      <td className="table-cell">{urecipe.recipe_name}</td>
                      <td className="table-cell"><img src={urecipe.featured_img} width="80" className='round' alt={urecipe.recipe_name} /></td>
                      <td className="table-cell">
                      <Link to={`/user-recipe-edit/`+urecipe.id} className="btn"><i className="bi bi-pencil-square"></i></Link>
                        <button className='btn2' onClick={() =>handleDeleteClick(urecipe.id)}><i class="bi bi-trash"></i></button>
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

export default MyRecipes;
