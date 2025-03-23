import React from 'react'
import "./Profile.css";
import UserDetailsCard from './UserDetailsCard';
import UserProgress from './UserProgress';
export default function Profile() {
  return (
    <div className='profile'>
      <div className="user-details">
        <UserDetailsCard />
      </div>
      <div className="progress-profile">
        <UserProgress />
      </div>
    </div>
  )
}
