import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import UserRegister from './components/User/UserRegister';
import UserDashboard from './components/User/UserDashboard';
import MyRecipes from './components/User/MyRecipes';
import UserRecipeEdit from './components/User/UserRecipeEdit';
import RecipeDetails from './components/User/RecipeDetails';
import UserRecipeDetails from './components/User/UserRecipeDetails';
import UserRecipeUpload from './components/User/UserRecipeUpload';
import FavoriteRecipes from './components/User/FavoriteRecipes';
import AllUserRecipes from './components/User/AllUserRecipes';
import UserProfileSettings from './components/User/UserProfileSettings';
import UserChangePassword from './components/User/UserChangePassword';
import UserLogin from './components/User/UserLogin';
import UserLogout from './components/User/UserLogout';
import UserChefRecipeView from './components/User/UserChefRecipeView';
import ChefRegistrationForm from './components/Chef/ChefRegistrationForm';
import ChefDashboard from './components/Chef/ChefDashboard';
import AllRecipes from './components/Chef/AllRecipes';
import ChefChangePassword from './components/Chef/ChefChangePassword';
import ChefFavoriteRecipes from './components/Chef/ChefFavoriteRecipes';
import ChefMyRecipes from './components/Chef/ChefMyRecipes';
import ChefProfileSettings from './components/Chef/ChefProfileSettings';
import ChefRecipeUpload from './components/Chef/ChefRecipeUpload';
import ChefLogin from './components/Chef/ChefLogin';
import ChefLogout from './components/Chef/ChefLogout';
import ChefRecipeEdit from './components/Chef/ChefRecipeEdit';
import ChefRecipeDetailview from './components/Chef/ChefRecipeDetailview';
import ChefUserRecipeDetailView from './components/Chef/ChefUserRecipeDetailView';

const Menu = () => {
  // const [showLogin, setShowLogin] = useState(false);
  // const userId = 1;

  return (
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-register' element={<UserRegister />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/my-recipes' element={<MyRecipes />} />
          <Route path='/user-recipe-edit/:recipe_id' element={<UserRecipeEdit />} />
          <Route path='/user-recipe-upload' element={<UserRecipeUpload />} />
          <Route path='/user-favorite-recipes' element={<FavoriteRecipes />} />
          <Route path='/user-all-recipes' element={<AllUserRecipes />} />
          <Route path='/user-profile-settings' element={<UserProfileSettings />} />
          <Route path='/user-change-password' element={<UserChangePassword />} />
          <Route path='/user-login' element={<UserLogin />} />
          <Route path='/user-recipedetails/:recipe_id' element={<RecipeDetails />} />
          <Route path='/user-allrecipedetails/:urecipe_id' element={<UserRecipeDetails />} />
          <Route path='/user-logout' element={<UserLogout />} />
          <Route path='/user-chef-recipeview' element={<UserChefRecipeView />} />
          <Route path='/chef-register' element={<ChefRegistrationForm />} />
          <Route path='/chef-login' element={<ChefLogin />} />
          <Route path='/chef-logout' element={<ChefLogout />} />
          <Route path='/chef-dashboard' element={<ChefDashboard />} />
          <Route path='/chef-all-recipes' element={<AllRecipes />} />
          <Route path='/chef-change-password' element={<ChefChangePassword />} />
          <Route path='/chef-favorite-recipes' element={<ChefFavoriteRecipes />} />
          <Route path='/chef-my-recipes/' element={<ChefMyRecipes />} />
          <Route path='/chef-profile-settings' element={<ChefProfileSettings />} />
          <Route path='/chef-recipe-upload' element={<ChefRecipeUpload />} />
          <Route path='/chef-recipedetails/:recipe_id' element={<ChefRecipeDetailview />} />
          <Route path='/chef-userrecipedetails/:urecipe_id' element={<ChefUserRecipeDetailView />} />
          <Route path='/chef-recipe-edit/:recipe_id' element={<ChefRecipeEdit />} />
        </Routes>      
      <Footer />
    </div>
  );
}

export default Menu;
