import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ChefSidebar from './ChefSidebar';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChefRecipeDetailview() {
    const [recipeData, setRecipeData] = useState([]);
    const [chefData, setChefData] = useState([]);
    const [favoriteStatus, setFavoriteStatus] = useState();
    let { recipe_id } = useParams();

    const chef_id=localStorage.getItem('chefId');

    useEffect(() => {

        try{
            axios.get(baseUrl+'/fetchchef-cheffavorite-status/'+chef_id+'/'+recipe_id)
            .then((res) =>{
                if(res.data.bool==true){
                setFavoriteStatus('success');
            }else{
                setFavoriteStatus('');
            }
            });
            } catch (error) {
                console.error(error);
            }

        try {
            axios.get(baseUrl + '/recipe/' + recipe_id + '/')
                .then((res) => {
                    setRecipeData(res.data);
                    setChefData(res.data.chef);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const markAsFavorite = () => {
        const formData = new FormData();
        formData.append('recipe', recipe_id);
        formData.append('chef', chef_id);
        formData.append('status', true);
        
        axios.post(baseUrl + '/chef-add-cheffavorite-recipe/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                Swal.fire({
                    title: 'This Recipe has been added to your wish list',
                    icon: 'success',
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                }).then(function(){ 
                    setFavoriteStatus('success');
                    window.location.reload();
                })
            }
        })
        .catch(error => {
            console.log("Error adding recipe to favorites:", error);
            Swal.fire({
                title: 'Error',
                text: 'There was an error adding the recipe to your wish list. Please try again later.',
                icon: 'error',
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        });
    };

    const removeFavorite = (pk) => {
        const formData = new FormData();
        formData.append('recipe', recipe_id);
        formData.append('chef', chef_id);
        formData.append('status', false);
        
        axios.get(baseUrl + '/chef-remove-cheffavorite-recipe/' + recipe_id + '/' + chef_id ,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                Swal.fire({
                    title: 'This Recipe has been removed from your wish list',
                    icon: 'success',
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                }).then(function(){ 
                    setFavoriteStatus('');
                    window.location.reload();
                })
            }
        })
        .catch(error => {
            console.log("Error removing recipe from favorites:", error);
            Swal.fire({
                title: 'Error',
                text: 'There was an error removing the recipe from your wish list. Please try again later.',
                icon: 'error',
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        });
    };
    

  return (
    <div className="container mt-4">
            <aside className='col-md-3'>
                <ChefSidebar />
            </aside>
            <section className='col-md-9'>  
                <div className="card">
                    <div className="card-body">
                        <div className="card-header">{recipeData.recipe_name}
                        <div className="float-start">
                            { favoriteStatus !== 'success' &&
                            <button1 onClick={markAsFavorite} title="Add in Your Favorite Recipe List" type="button" className='btn btn-danger '><i class="bi bi-heart-fill"></i></button1>
                            }
                            { favoriteStatus === 'success' &&
                            <button1 onClick={removeFavorite} title="Remove from Your Favorite Recipe List" type="button" className='btn btn-success'><i class="bi bi-heart"></i></button1>
                            }
                        </div>
                        </div>
                        <div className="chef-info img-thumbnail col-md-3 mt-4 float-end shadow p-3 mb-5 bg-body-tertiary rounded">
                            <img src={chefData.profile_image} className='img-fluid' alt={chefData.full_name} />
                            <p className="chef-name">{chefData.full_name}</p>
                        </div>
                      
                        <h3 className="directions-heading mt-4">Recpie Details</h3> 
                        <div className='container-fluid'>
                            <pre>{recipeData.recipe_description}</pre>
                        </div>
                        <div className="container-lg">
                        <div className="d-flex justify-content-center align-items-center float-end col-md-6" style={{ height: "400px" }}>
                            <img src={recipeData.featured_img} alt={recipeData.recipe_name} className="img-fluid mx-auto d-block shadow-lg p-3 mb-5 bg-body-tertiary rounded" />
                        </div> 
                        <h3 className="directions-heading mt-4">Ingredients</h3> 
                        <div className='container-fluid'>
                            <pre>{recipeData.ingredients}</pre>
                        </div>
                            {/* <img src={recipeData.profile_image} alt={recipeData.recipe_name} className="recipe-img" /> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default ChefRecipeDetailview;