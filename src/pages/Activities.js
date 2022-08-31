import axios from 'axios'
import React, { Component } from 'react'
import { umallAPI, baseURL } from '../utils/apiMap'
import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { idToShortURL, shortURLtoID } from '../utils/helper'
import { Link, Outlet } from 'react-router-dom'
import Loading from "../pages/Loading";

class Card extends Component {
  render() {
    let a = this.props.a
    return (
      <div key={a._id} className="box-border shadow-sm border m-2 rounded-lg card">
        <div className='overflow-hidden'>
          <img src={baseURL + a.cover_image_url} className="rounded-t-lg"></img>
        </div>
        <div className='flex flex-row'>
          <div className='m-2 flex-grow'>
            <p className='font-semibold text-sm'>{a.title}</p>
            <p className='text-sm text-gray-400'>{a.startdatetime.substring(5, 10)}</p>
          </div>
          <div className='grid content-center m-1 text-gray-500'>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
      </div>
    )
  }
}

export default function Activities() {
  let [activitiesList, setActivitiesList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(umallAPI.activities + "/all/").then(
      response => {
        setActivitiesList(response.data.content);
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
      <div className='flex flex-col'>
        <div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 100: 1, 350: 2, 750: 3 }}
          >
            <Masonry>
              {
                activitiesList.map(
                  a => {
                    let shortenID = idToShortURL(a._id);
                    // console.log("Before:" + shortURLtoID(idToShortURL(a._id)))
                    // console.log("After:" + shortenID)
                    if (a.type === "ACTIVITY")
                      return (
                        <Link to={"/detail/activities/" + shortenID}>
                          <Card a={a} />
                        </Link>
                      )
                    //webiste type
                    else
                      return (
                        <a href={a.link} target="_blank">
                          <Card a={a} />
                        </a>
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
