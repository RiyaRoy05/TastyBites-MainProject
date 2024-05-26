import React from 'react'

function ChefLogout() {
    localStorage.removeItem('chefLoginStatus')
    window.location.href='/chef-login';
  return (
    <div>
        
    </div>
  )
}

export default ChefLogout