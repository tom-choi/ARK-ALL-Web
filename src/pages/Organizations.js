import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL, umallAPI } from '../utils/apiMap'
import { color } from '../utils/uiMap'
import { Link } from 'react-router-dom'
import { organizationsType } from '../utils/langMap'
import Loading from "../pages/Loading";

export default function Organizations() {
  let [organizationsList, setOrganizationsList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(umallAPI.organizations + "all/").then(
      response => {
        setOrganizationsList(response.data.content);
        console.log(response.data.content);
        setLoading(false);
      }
    )
  }, [])

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div>
      <div className='grid grid-cols-3'>
        {
          organizationsList.map((o) => {
            return (
              <Link to={"/detail/organizations/" + o.club_num} className='card m-1 lg:m-2 rounded-lg border shadow-md flex flex-col p-2' key={o.club_num}>
                <div className='p-3 flex'>
                  <div className="flex flex-wrap content-center shadow rounded-full overflow-hidden aspect-square">
                  <img src={baseURL + o.logo_url}></img>
                  </div>
                </div>
                <div className='flex flex-col text-center'>
                  <div className='text-sm'>{o.name}</div>
                  <div className='text-xs' style={{ color: color.theme }}>#{organizationsType[o.tag]}</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
