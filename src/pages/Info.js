import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'
import styles from './Info.module.css'

export default function Info() {
  return (
    <div className='border bg-white rounded-lg mb-3 pb-2 shadow flex flex-col justify-center'>
      <div className="text-sm font-medium text-center bg-white w-full text-gray-500 border-b border-gray-200
      fixed left-0 top-14 z-50">
        <ul className="flex flex-wrap -mb-px justify-center">
          <li className="mr-2">
            <NavLink to="activities" className={({ isActive }) =>
              isActive ? styles.active : styles.base
            }>
              組織活動
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="organizations" className={({ isActive }) =>
              isActive ? styles.active : styles.base
            }>
              進駐組織
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="news" className={({ isActive }) =>
              isActive ? styles.active : styles.base
            }>
              新聞
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="um-activities" className={({ isActive }) =>
              isActive ? styles.active : styles.base
            }>
              澳大活動
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='mt-14'>
      <Outlet />
      </div>
    </div>
  )
}