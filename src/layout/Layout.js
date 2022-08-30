import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { btnStyle, color } from '../utils/uiMap'
import arklogo from '../images/arkallLogo-original-rounded.png'

export default function Layout() {
    return (
        <div className='m-auto max-w-screen-sm'>
            <div className='flex justify-center text-white shadow-sm w-full items-center
            fixed left-0 top-0 h-14 backdrop-blur-sm z-20' style={{ backgroundColor: color.theme }}>
                <Link className='flex flex-wrap content-center' to="/">
                    <div className='mr-1 flex flex-wrap content-center'>
                        <img src={arklogo} style={{ height: "1.5rem" }} />
                    </div>
                    <div className='text-lg font-bold'>ARK ALL</div>
                </Link>
            </div>
            <div style={{ marginBottom: "5rem", marginTop: "3.5rem" }}>
                <Outlet />
            </div>
            <div className='flex justify-center w-full h-16 shadow-sm bg-white
            fixed left-0 bottom-0
            items-center text-white backdrop-blur-sm'>
                <Link to="/" style={btnStyle}>主頁</Link> |
                <Link to="/info/activities" style={btnStyle}>資訊</Link> |
                <Link to="/services" style={btnStyle}>服務</Link> |
                <Link to="/user" style={btnStyle}>我的</Link>
            </div>
        </div>
    )
}
