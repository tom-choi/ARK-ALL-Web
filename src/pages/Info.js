import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Info() {
  return (
    <div>
      <div className='flex justify-center'>
        <h1>Info</h1>
      </div>
      <div className='flex justify-center'>
        <Link to="activities">Activities</Link> |
        <Link to="organizations">Organizations</Link> |
        <Link to="news">News</Link> |
        <Link to="um-activities">UM Activities</Link>
      </div>
      <Outlet />
    </div>
  )
}
