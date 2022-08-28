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
      {/* 
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <Link to="activities" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              Activities
            </Link>
          </li>
          <li class="mr-2">
            <Link to="organizations" class="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">
              Organizations
            </Link>
          </li>
          <li class="mr-2">
            <Link to="news" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              News
            </Link>
          </li>
          <li class="mr-2">
            <Link to="um-activities" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              UM Activities
            </Link>
          </li>
        </ul>
      </div>
      */}
      <Outlet />
    </div>
  )
}
