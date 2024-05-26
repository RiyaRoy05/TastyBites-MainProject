import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="col-md">
      <h2 className="heading">User Dashboard</h2>
      <div className="list-recipe">
        {/* <ul className="sidebar-menu"> */}
          {/* <Link to='/chef-dashboard' className='list-recipe-item'>Dashboard</Link> */}
          <Link to='/my-recipes' className='list-recipe-item'>My Recipes</Link>
          <Link to='/user-recipe-upload' className='list-recipe-item'>Recipes Upload</Link>
          <Link to='/user-chef-recipeview' className='list-recipe-item'>Chef Recipes</Link>
          <Link to='/user-all-recipes' className='list-recipe-item'>User Recipes</Link>
          <Link to='/user-favorite-recipes' className='list-recipe-item'>Favorite Dishes</Link>
          <Link to='/user-profile-settings' className='list-recipe-item'>Profile Settings</Link>
          <Link to='/user-change-password' className='list-recipe-item'>Change Password</Link>
        {/* </ul> */}
      </div>
    </div>
  );
}

export default Sidebar;
