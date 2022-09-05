import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { umAPI } from '../utils/apiMap'
import { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import Loading from '../pages/Loading'
import ImageViewer from 'react-simple-image-viewer';
import { color } from '../utils/uiMap'

export default function ShowUMActivities() {
  let id = useParams().id.slice(-5)
  let lang = useParams().lang
  let dateWithId = useParams().id
  console.log(id)

  let dateFrom = moment(useParams().id.slice(0, -6), "YYYYMMDD").subtract(1, 'days')
  let dateTo = moment(useParams().id.slice(0, -6), "YYYYMMDD").add(1, 'days')

  console.log(dateFrom.format())

  const [event, setEvent] = useState([])
  const [isLoading, setLoading] = useState(true)

  let noZH = true;
  let noEN = true;


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

  useEffect(() => {
    window.scrollTo(0,0)
    console.log("dateFrom", dateFrom.format().slice(0, 10))
    console.log("dateTo", dateTo.format().slice(0, 10))
    axios.get(umAPI.events + "?date_from=" + encodeURIComponent(dateFrom.format().slice(0, 10)) + "&date_to=" + encodeURIComponent(dateTo.format().slice(0, 10)), {
      headers: {
        Accept: 'application/json',
        Authorization: umAPI.token,
      },
    }).then(
      response => {
        setEvent(response.data._embedded)
        console.log("img", response.data._embedded[0].common.posterUrl)
        response.data._embedded.map((e, index) => {
          if (e.itemId.toString() === id)
            setImages([response.data._embedded[index].common.posterUrl])
        })
        //false when no more news
        console.log("UMActivities", response.data._embedded)
        setLoading(false);
      }
    )
  }, [])

  const contents = {
    "zh_TW":{
      organizedBys:"主辦單位",
      coorganizers:"協辦單位",
      content:"內容",
      targetAudiences:"對象",
      speakers:"講者",
      remark:"備註",
      languages:"語言",
      contactName:"名稱",
      contactPhone:"電話",
      contactFax:"傳真",
      contactEmail:"電郵",
      contactPerson:"聯絡人",
      overview:"詳情"
    },
    "en_US":{
      organizedBys:"Organiser",
      coorganizers:"Co-organiser",
      content:"Content",
      targetAudiences:"Target Audience",
      speakers:"Speaker",
      remark:"Remark",
      languages:"Language",
      contactName:"Name",
      contactPhone:"Phone",
      contactFax:"Fax",
      contactEmail:"Email",
      contactPerson:"Contact Person",
      overview:"Overview"
    },
  }

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 bg-white">
        <Link to={"/detail/um-activities/" + dateWithId + "/zh_TW"} className="p-1 text-center">中文</Link>
        <Link to={"/detail/um-activities/" + dateWithId + "/en_US"} className="p-1 text-center">English</Link>
      </div>
      <hr />
      {
        event.map((e) => {
          if (e.itemId.toString() === id) {
            return e.details.map((l) => {
              if (l.locale === "zh_TW") {
                noZH = false;
                console.log("has ZH")
              }
              if (l.locale === "en_US") {
                noEN = false;
                console.log("has EN")
              }
              if (l.locale === lang) {
                return (
                  <div key={e._id} className="flex flex-col">
                    <div>
                      <div className='overflow-hidden max-h-80'>
                        <div className='flex justify-center relative'>
                          {images.map((src, index) => (
                            <img
                              src={src}
                              onClick={() => openImageViewer(index)}
                              key={index}
                              style={{ margin: "2px" }}
                              className="absolute max-h-80 z-10"
                              alt=""
                            />
                          ))}

                          {isViewerOpen && (
                            <ImageViewer
                              src={images}
                              currentIndex={currentImage}
                              onClose={closeImageViewer}
                              disableScroll={false}
                              closeOnClickOutside={true}
                            />
                          )}
                        </div>
                        <img src={e.common.posterUrl} className="filter blur brightness-75 object-center w-full"></img>
                      </div>
                    </div>
                    <div className='p-4 bg-white shadow'>
                      <p className='font-bold text-xl'>{l.title}</p>
                      <hr className='my-2' />
                      <div className='mt-2'>
                        <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block'
                          style={{ color: color.theme, borderColor: color.theme }}>
                          @</span>
                        <span className='ml-2 inline-block align-bottom'>
                          {l.venues.map(v => v)}
                        </span><br />
                        <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block'
                          style={{ color: color.theme, borderColor: color.theme }}>
                          from</span>
                        <span className='ml-2 inline-block align-bottom'>{e.common.dateFrom.slice(0, 10) + " " + e.common.timeFrom.slice(11, 16)}</span><br />
                        <span className='rounded-full border shadow-xs mt-1 px-2 text-xs align-top inline-block'
                          style={{ color: color.theme, borderColor: color.theme }}>
                          to</span>
                        <span className='ml-2 inline-block align-bottom'>{e.common.dateTo.slice(0, 10) + " " + e.common.timeTo.slice(11, 16)}</span><br />
                      </div>
                    </div>
                    <div className='mt-2 p-4 bg-white shadow'>
                      <p style={{ color: color.theme }} className="font-bold lg:text-lg">{contents[lang].overview}</p>
                      <hr className='my-2' />
                      <table className='table-fixed text-sm lg:text-base' style={{ overflowWrap: "anywhere" }}>
                        {[
                          { [contents[lang].organizedBys]: l.organizedBys },
                          { [contents[lang].coorganizers]: l.coorganizers },
                          { [contents[lang].content]: l.content },
                          { [contents[lang].targetAudiences]: l.targetAudiences },
                          { [contents[lang].speakers]: l.speakers },
                          { [contents[lang].remark]: l.remark },
                          { [contents[lang].languages]: l.languages }
                        ].map((o) => {
                          for (var k in o) {
                            return (
                              o[k] &&
                              <tr>
                                <td className="w-20 font-bold pb-2" style={{ color: color.theme, verticalAlign: "top" }}>{k}</td>
                                <td className='pb-2'>{o[k]}</td>
                              </tr>
                            )
                          }
                        }
                        )
                        }
                      </table>
                    </div>
                    <div className='mt-2 p-4 bg-white shadow'>
                      <p style={{ color: color.theme }} className="font-bold lg:text-lg">{contents[lang].contactPerson}</p>
                      <hr className='my-2' />
                      <table className='table-fixed text-sm lg:text-base' style={{ overflowWrap: "anywhere" }}>
                        {[
                          { [contents[lang].contactName]: l.contactName },
                          { [contents[lang].contactPhone]: l.contactPhone },
                          { [contents[lang].contactFax]: l.contactFax },
                          { [contents[lang].contactEmail]: l.contactEmail }
                        ].map((o) => {
                          for (var k in o) {
                            return (
                              o[k] &&
                              <tr>
                                <td className="w-20 font-bold pb-2" style={{ color: color.theme, verticalAlign: "top" }}>{k}</td>
                                <td className='pb-2'>{o[k]}</td>
                              </tr>
                            )
                          }
                        }
                        )
                        }
                      </table>
                    </div>
                  </div>
                )
              } else {
                return ""
              }
            }
            )
          }
          else return ""
        })
      }
      {lang === "zh_TW" && noZH && <div className='text-center'>抱歉，此文章並未提供中文版本</div>}
      {lang === "en_US" && noEN && <div className='text-center'>Sorry, there is no English version.</div>}
    </div>
  )
}
