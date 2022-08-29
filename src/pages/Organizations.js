import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL, umallAPI } from '../utils/apiMap'
import { color } from '../utils/uiMap'

export default function Organizations() {
  let [organizationsList, setOrganizationsList] = useState([])

  useEffect(() => {
    axios.get(umallAPI.organizations).then(
      response => {
        setOrganizationsList(response.data.content);
        console.log(response.data.content);
      }
    )
  }, [])

  return (
    <div>
      <div className='grid grid-cols-3'>
        {
          organizationsList.map((o) => {
            return (
              <div className='m-2 rounded-lg border shadow-md flex flex-col p-2'>
                <div className='p-3 flex-grow'>
                  <img src={baseURL + o.logo_url} style={{borderRadius:"50%"}}></img>
                </div>
                <div className='flex flex-col text-center'>
                  <div className='text-sm'>{o.name}</div>
                  <div className='text-xs' style={{color:color.theme}}>#{o.tag}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
