import React from 'react'

function UserLogout() {
    localStorage.removeItem('userLoginStatus')
    window.location.href='/user-login';
  return (
    <div>
        
    </div>
  )
}

export default UserLogout