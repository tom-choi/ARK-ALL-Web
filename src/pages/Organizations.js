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
              <Link to={"/detail/organizations/" + o.club_num} className='m-2 rounded-lg border shadow-md flex flex-col p-2' key={o.club_num}>
                <div className='p-3 flex-grow'>
                  <img src={baseURL + o.logo_url} style={{ borderRadius: "50%" }}></img>
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
