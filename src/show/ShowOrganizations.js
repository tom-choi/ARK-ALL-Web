import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { umallAPI, baseURL } from '../utils/apiMap';
import { color } from '../utils/uiMap';
import { organizationsType } from '../utils/langMap';
import Loading from "../pages/Loading";
import { dateParser, idToShortURL } from '../utils/helper';
import { Link } from 'react-router-dom';
import ImageViewer from 'react-simple-image-viewer';
import moment from 'moment';

export default function ShowOrganizations() {
  const [isLoading, setLoading] = useState(true)
  let params = useParams()
  let [club, setClub] = useState({})
  let [activitiesByClub, setActivitiesByClub] = useState([])
  let reqURL = umallAPI.getClub + params.id
  console.log(reqURL);
  let [img, setImg] = useState({})
  let [imgExist, setImgExist] = useState(true)
  let [checkContact, setCheckContact] = useState(0)

  let [checkCurrentA, setCheckCurrentA] = useState(0)
  let [checkPastA, setCheckPastA] = useState(0)

  //imageviewer1
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
    axios.get(reqURL).then(
      res => {
        let clubData = res.data.content;
        setImg(baseURL + clubData.club_photos_list[0])
        setImages(clubData.club_photos_list)
        setImages2([baseURL + clubData.club_photos_list[0]])
        clubData.club_num = clubData.club_num.toString().padStart(3, '0')
        setClub(clubData);
        if (clubData.club_photos_list[0] === undefined)
          setImgExist(false);
        console.log("club", clubData);
        console.log("img", baseURL + clubData.club_photos_list[0])
        console.log("img2", images2)

        //check if there is no contact
        clubData.contact.map((c) => {
          if (c.num !== "") {
            setCheckContact(checkContact + 1)
            console.log(checkContact)
          }
        })

        //get activities created by the club
        axios.get(umallAPI.activitiesByClub + clubData.club_num).then(
          res => {
            console.log("activity", res.data.content);
            setActivitiesByClub(res.data.content);
            //check if there is no current or past activities
            res.data.content && res.data.content.map(a => {
              if (moment() > moment(a.enddatetime))
                setCheckPastA(checkPastA + 1)
              if (moment() < moment(a.enddatetime))
                setCheckCurrentA(checkCurrentA + 1)
            });

            setLoading(false);
          }
        )

      }
    )
  }, []
  )

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div>
      {imgExist ?
        <>
          {images2.map((src, index) => (
              <img
                src={src}
                onClick={() => openImageViewer2(index)}
                key={index}
                className="max-h-80 object-cover w-full"
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
        </>
        :
        <>
          <img src="https://umall.one/static/images/club/51f4ac67-be39-4234-941f-c56a94ea529f/club_images/rn_image_picker_lib_temp_16b3c6e9-e458-4933-b8fb-86b012a43806.png"
            className="max-h-80"
          />
        </>
      }

      <div className='p-4 bg-white shadow'>
        <div className='flex flex-row'>
          <div className='flex flex-wrap content-center'>
            <img src={baseURL + club.logo_url} style={{ borderRadius: "50%", maxWidth: "3.25rem", minHeight: "3.25rem" }} className="shadow-md object-contain"></img>
          </div>
          <div className='flex flex-wrap content-center'>
            <div className='ml-3'>
              <span className='text-lg font-semibold align-top'>{club.name}</span>
              <br />
              <span className='text-sm rounded-md border shadow-xs p-1 align-bottom text-white bg-blue-500'>
                #{organizationsType[club.tag]}
              </span>
              <span className='ml-1 text-sm rounded-md border shadow-xs p-1 align-bottom'>@{club.club_num}</span>
            </div>
          </div>
        </div>
        {club.intro && <>
          <hr className='mt-4' />
          <div className='mt-3'>
            <p style={{ whiteSpace: "pre-line" }}>{club.intro}</p>
          </div>
        </>
        }
      </div>

      {activitiesByClub && <>
        {checkCurrentA !== 0 &&
          <div className='mt-2 px-4 pt-2 pb-1 bg-white shadow'>
            <p style={{ color: color.theme }} className="font-bold">即將舉辦/進行中</p>
            <hr className='mt-2 mb-3' />
            <div className="flex flex-col">
              {activitiesByClub.map((a, index) => {
                if (moment() < moment(a.enddatetime))
                  return (
                    <Link to={"/detail/activities/" + idToShortURL(a._id)}>
                      <div key={index} className="flex mb-3">
                        <img src={baseURL + a.cover_image_url} className="rounded-lg shadow w-1/3" />
                        <div className='ml-2'>
                          <p className='ml-2 font-bold'>{a.title}</p>
                          <div className='ml-2'>
                            {a.location && <><span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              @</span>
                              <span className='ml-2 inline-block align-bottom'>{a.location}</span><br /></>}

                            <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              from</span>
                            <span className='ml-2 inline-block align-bottom'>{dateParser(a.startdatetime)}</span><br />
                            <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              to</span>
                            <span className='ml-2 inline-block align-bottom'>{dateParser(a.enddatetime)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
              })}
            </div>
          </div>
        }
        {checkPastA !== 0 &&
          <div className='mt-2 px-4 pt-2 pb-4 bg-white shadow'>
            <p style={{ color: color.theme }} className="font-bold">過往活動</p>
            <hr className='my-2' />
            <div className="flex flex-col">
              {activitiesByClub.map((a, index) => {
                if (moment() > moment(a.enddatetime))
                  return (
                    <Link to={"/detail/activities/" + idToShortURL(a._id)} key={index}>
                      <div className="flex mt-3">
                        <img src={baseURL + a.cover_image_url} className="rounded-lg shadow w-1/3" />
                        <div className='ml-2'>
                          <p className='ml-2 font-bold'>{a.title}</p>
                          <div className='ml-2'>
                            {a.location && <><span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              @</span>
                              <span className='ml-2 inline-block align-bottom'>{a.location}</span><br /></>}

                            <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              from</span>
                            <span className='ml-2 inline-block align-bottom'>{dateParser(a.startdatetime)}</span><br />
                            <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block' style={{ color: color.theme, borderColor: color.theme }}>
                              to</span>
                            <span className='ml-2 inline-block align-bottom'>{dateParser(a.enddatetime)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
              })}
            </div>
          </div>
        }
      </>
      }

      {images[0] !== undefined &&
        <div>
          <div className='mt-2 px-4 pt-2 pb-4 bg-white shadow'>
            <p style={{ color: color.theme }} className="font-bold">照片</p>
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
        </div>
      }

      {checkContact !== 0 &&
        <div className='mt-2 px-4 pt-2 pb-4 bg-white shadow'>
          <p style={{ color: color.theme }} className="font-bold">聯絡方式</p>
          <hr className='my-2' />

          {club.contact.map((c, index) => {
            if (c.num !== "") {
              if (c.type === "Website" || c.num.includes("https://"))
                return <div key={index}>
                  <div className='w-20 inline-block'>{c.type}:</div>
                  <a href={c.num} target="_blank" style={{ color: color.theme, overflowWrap: "break-word" }} className="inline">{c.num}</a>
                </div>
              else if (c.type === "Email")
                return <div key={index}>
                  <div className='w-20 inline-block'>{c.type}:</div>
                  <a href={"mailto:" + c.num} target="_blank" style={{ color: color.theme, overflowWrap: "break-word" }} className="inline">{c.num}</a>
                </div>
              else return <div key={index}>
                <div className='w-20 inline-block'>{c.type}:</div>
                <p className='inline'>{c.num}</p>
              </div>
            }
            else {
              return ""
            }
          })}
        </div>
      }
    </div>
  )
}
