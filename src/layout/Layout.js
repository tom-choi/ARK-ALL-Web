import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='container m-auto h-screen p-4'>
            <div className='flex justify-center'>
                <h1>ARK ALL</h1>
            </div>
            <div className='flex justify-center'>
                <Link to="/">Home</Link> |
                <Link to="info">Info</Link> |
                <Link to="services">Services</Link> |
                <Link to="user">User</Link>
            </div>
            <Outlet />
            <div className='flex justify-center'>
                <h1>GoodBye!</h1>
            </div>
        </div>
    )
}
