import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { btnStyle, color } from '../utils/uiMap'

export default function Layout() {
    return (
        <div className='m-auto max-w-screen-sm'>
            <div className='flex justify-center text-white shadow-sm w-full items-center
            fixed left-0 top-0 z-50 h-10 backdrop-blur-sm' style={{backgroundColor:color.theme}}>
                <h1>ARK ALL</h1>
            </div>
            <div style={{ marginBottom: "5rem", marginTop: "3.5rem" }}>
                <Outlet />
            </div>
            <div className='flex justify-center w-full h-16 shadow-sm bg-white
            fixed left-0 bottom-0
            items-center text-white backdrop-blur-sm'>
                <Link to="/" style={btnStyle}>主頁</Link> |
                <Link to="info/activities" style={btnStyle}>資訊</Link> |
                <Link to="services" style={btnStyle}>服務</Link> |
                <Link to="user" style={btnStyle}>我的</Link>
            </div>
        </div>
    )
}
