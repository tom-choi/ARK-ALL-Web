import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { umAPI } from '../utils/apiMap'
import { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import moment from 'moment'

export default function ShowNews() {
  let id = useParams().id.slice(-5)
  console.log(id)

  let dateFrom = moment(useParams().id.slice(0,-6), "YYYYMMDD").subtract(1, 'days')
  let dateTo = moment(useParams().id.slice(0,-6), "YYYYMMDD").add(1, 'days')

  console.log(dateFrom.format())

  const [news, setNews] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [lang, setLang] = useState("zh_TW")

  const [images, setImages] = useState([])
  const [gallery, setGallery] = useState([])
  /*
    const images = [
      {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
      },
    ];
    */

  useEffect(() => {
    axios.get(umAPI.news + "?date_from=" + encodeURIComponent(dateFrom.format()) + "&date_to=" + encodeURIComponent(dateTo.format()), {
      headers: {
        Accept: 'application/json',
        Authorization: umAPI.token,
      },
    }).then(
      response => {
        setNews(response.data._embedded)
        setImages(response.data._embedded[0].common.imageUrls)
        setGallery([])
        response.data._embedded.map((n, index) => {
          if (n.itemId.toString() === id)
            pushToGallery(response.data._embedded[index].common.imageUrls)
        })
        //false when no more news
        console.log("New News", response.data._embedded)
        console.log("Images", response.data._embedded[0].common.imageUrls)
        setLoading(false);
      }
    )
  }, [])

  function createMarkup(content) {
    return { __html: content };
  }

  function pushToGallery(imgs) {
    imgs.map(i => {
      setGallery(prevImage => {
        return [...prevImage, { "original": i, "thumbnail": i }]
      }
      )
    })
  }

  return (
    <div className='bg-white shadow'>
      {
        news.map((n) => {
          if (n.itemId.toString() === id) {
            return n.details.map((l) => {
              if (l.locale === lang) {
                return (
                  <div key={n._id} className="flex flex-col">
                    <div>
                      {/*<img src={n.common.imageUrls[0]} />*/}
                      <ImageGallery
                        showPlayButton={false}
                        items={gallery}
                      />
                    </div>
                    <div>
                      <p className='font-bold'>{l.title}</p>
                      <p>{n.common.publishDate.slice(0, 10)}</p>
                      <p dangerouslySetInnerHTML={createMarkup(l.content)} className="text-base"></p>
                    </div>
                  </div>
                )
              } else
                return ""
            }
            )
          }
          else return ""
        })
      }
    </div>
  )
}
