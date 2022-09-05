import React from 'react'
import { useParams } from 'react-router-dom'
import { shortURLtoID, dateParser } from '../utils/helper'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { umallAPI, baseURL } from '../utils/apiMap'
import { color } from '../utils/uiMap'
import { Link } from 'react-router-dom'
import Loading from "../pages/Loading"
import ImageViewer from 'react-simple-image-viewer';

export default function ShowActivities() {
  let params = useParams()
  let id = shortURLtoID(params.id)
  const [isLoading, setLoading] = useState(true)

  let [activity, setActivity] = useState([{}])
  let [club, setClub] = useState({ name: "loading" })

  //image viewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  //imageviewer2
  const [currentImage2, setCurrentImage2] = useState(0);
  const [isViewerOpen2, setIsViewerOpen2] = useState(false);
  const [images2, setImages2] = useState([]);

  const openImageViewer2 = useCallback((index) => {
    setCurrentImage2(index);
    setIsViewerOpen2(true);
  }, []);

  const closeImageViewer2 = () => {
    setCurrentImage2(0);
    setIsViewerOpen2(false);
  };

  useEffect(() => {
    //get activity
    axios.get(umallAPI.activities + "id/?id=" + id).then(
      response => {
        let activityData = response.data.content
        setActivity(activityData);
        console.log("activity:", activityData);
        setImages(activityData.relate_image_url);
        console.log("images:", images);
        setImages2([baseURL + activityData.cover_image_url])
        console.log(umallAPI.getClub + activityData.created_by, "@@@");
        //get CreatedBy after get activity
        axios.get(umallAPI.getClub + activityData.created_by).then(
          response => {
            setClub(response.data.content);
            console.log(response.data.content);
            setLoading(false);
          }
        )
      }
    )
  }, [])

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div>
      <div className='overflow-hidden max-h-80'>
        <div className='flex justify-center relative'>
          {images2.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer2(index)}
              key={index}
              style={{ margin: "2px" }}
              className="absolute max-h-80 z-10"
              alt=""
            />
          ))}

          {isViewerOpen2 && (
            <ImageViewer
              src={images2}
              currentIndex={currentImage2}
              onClose={closeImageViewer2}
              disableScroll={false}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <img src={baseURL + activity.cover_image_url} className="filter blur brightness-75 object-center w-full"></img>
      </div>

      <div className='px-4 py-3 bg-white shadow'>
        <p className='font-bold text-xl'>{activity.title}</p>
        <hr className='my-2' />
        <div className='flex flex-row'>
          <Link to={"/detail/organizations/" + club.club_num}>
            <img src={baseURL + club.logo_url} style={{ borderRadius: "50%", maxWidth: "3rem", minHeight: "3rem" }} className="shadow-md"></img>
          </Link>
          <div className='flex flex-wrap content-center'>
            <p className='ml-3 text-md font-semibold'>{club.name}</p>
          </div>
        </div>
        <div className='mt-2'>
          {activity.location && <><span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
            @</span>
            <span className='ml-2 inline-block align-bottom'>{activity.location}</span><br /></>}

          <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
            from</span>
          <span className='ml-2 inline-block align-bottom'>{dateParser(activity.startdatetime)}</span><br />
          <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
            to</span>
          <span className='ml-2 inline-block align-bottom'>{dateParser(activity.enddatetime)}</span><br />
        </div>
      </div>

      {(activity.introduction || activity.link) &&
        <div className='mt-2 p-4 bg-white shadow'>
          <p style={{ color: color.theme}} className="font-bold">詳情</p>
          <hr className='my-2' />
          <p style={{ overflowWrap: "break-word" }}>{activity.introduction}</p>
          <a href={activity.link} target="_blacnk" style={{ color: color.theme, overflowWrap: "break-word" }}>{activity.link}</a>
        </div>
      }

      {images &&
        <div className='mt-2 p-4 bg-white shadow'>
          <p style={{ color: color.theme }} className="font-bold">相關照片</p>
          <hr className='my-2' />
          <div className='grid lg:grid-cols-4 grid-cols-3 imageViewer'>
            {
              images.map((src, index) => (
                <div>
                  <img
                    src={baseURL + src}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    alt=""
                  />
                </div>
              ))}
          </div>
          {isViewerOpen && (
            <ImageViewer
              src={images.map(u => baseURL + u)}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
      }
    </div>
  )
}
