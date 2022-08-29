import axios from 'axios'
import React from 'react'
import { umallAPI, baseURL } from '../utils/apiMap'
import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Activities() {
  let [activitiesList, setActivitiesList] = useState([])

  useEffect(() => {
    axios.get(umallAPI.activities).then(
      response => setActivitiesList(response.data.content)
    )
  }, [])

  return (
    <div>
      <div className='flex flex-col'>
        <div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 100: 1, 350: 2, 750: 3 }}
          >
            <Masonry>
              {
                activitiesList.map(
                  a => {
                    return (
                      <div key={a._id} className="box-border shadow-sm border m-2 rounded-lg">
                        <img src={baseURL + a.cover_image_url}></img>
                        <div className='flex flex-row'>
                          <div className='m-2 flex-grow'>
                            <p>{a.title}</p>
                            <p className='text-sm text-gray-400'>{a.startdatetime.substring(5, 10)}</p>
                          </div>
                          <div className='grid content-center m-1 text-gray-500'>
                          <ion-icon name="chevron-forward-outline"></ion-icon>
                          </div>
                        </div>
                      </div>
                    )
                  }
                )
              }
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  )
}
