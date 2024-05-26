import React from 'react';
import { Link } from 'react-router-dom';
import './ChefSidebar.css'

function ChefSidebar() {
  return (
    <div className="col-md">
      <h2 className="heading">Chef Dashboard</h2>
      <div className="list-recipe">
        {/* <ul className="sidebar-menu"> */}
          {/* <Link to='/chef-dashboard' className='list-recipe-item'>Dashboard</Link> */}
          <Link to='/chef-my-recipes' className='list-recipe-item'>My Recipes</Link>
          <Link to='/chef-recipe-upload' className='list-recipe-item'>Recipes Upload</Link>
          {/* <Link to='/user-all-recipes' className='list-recipe-item'>User Recipes</Link> */}
          <Link to='/chef-all-recipes' className='list-recipe-item'>All Recipes</Link>
          <Link to='/chef-favorite-recipes' className='list-recipe-item'>Favorite Dishes</Link>
          <Link to='/chef-profile-settings' className='list-recipe-item'>Profile Settings</Link>
          <Link to='/chef-change-password' className='list-recipe-item'>Change Password</Link>
        {/* </ul> */}
      </div>
    </div>
  );
}

export default ChefSidebar;
