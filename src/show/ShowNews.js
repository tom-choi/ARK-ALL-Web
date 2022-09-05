import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { umAPI } from '../utils/apiMap'
import { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import moment from 'moment'
import Loading from '../pages/Loading'

//table width bug unsolved in /detail/news/20220722-53859/zh_TW

export default function ShowNews() {
  let id = useParams().id.slice(-5)
  let lang = useParams().lang
  let dateWithId = useParams().id
  console.log(id)

  let dateFrom = moment(useParams().id.slice(0,-6), "YYYYMMDD").subtract(1, 'days')
  let dateTo = moment(useParams().id.slice(0,-6), "YYYYMMDD").add(1, 'days')

  console.log(dateFrom.format())

  const [news, setNews] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [images, setImages] = useState([])
  const [gallery, setGallery] = useState([])

  let noZH = true;
  let noEN = true;
  let noPT = true;
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
    window.scrollTo(0,0)
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

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div className='bg-white shadow'>
      <div className="grid grid-cols-3">
        <Link to={"/detail/news/"+dateWithId+"/zh_TW"} className="p-1 text-center">中文</Link>
        <Link to={"/detail/news/"+dateWithId+"/en_US"} className="p-1 text-center">English</Link>
        <Link to={"/detail/news/"+dateWithId+"/pt_PT"} className="p-1 text-center">Português</Link>
      </div>
      <hr />
      {
        news.map((n) => {
          if (n.itemId.toString() === id) {
            return n.details.map((l) => {
              if (l.locale === "zh_TW"){
                noZH = false;
                console.log("has ZH")
              }
              if (l.locale === "en_US"){
                noEN = false;
                console.log("has EN")
              }
              if (l.locale === "pt_PT"){
                noPT = false;
                console.log("has PT")
              }
              if (l.locale === lang) {
                return (
                  <div key={n._id} className="flex flex-col">
                    <div>
                      <ImageGallery
                        showPlayButton={false}
                        items={gallery}
                      />
                    </div>
                    <div className='p-4'>
                      <p className='font-bold text-2xl'>{l.title}</p>
                      <p>{n.common.publishDate.slice(0, 10)}</p>
                      <hr className='my-3'/>
                      <div dangerouslySetInnerHTML={createMarkup(l.content)} class="newsContent"></div>
                    </div>
                  </div>
                )
              } else{
                return ""
              }
            }
            )
          }
          else return ""
        })
      }
      {lang==="pt_PT" && noPT && <div className='text-center'>Sorry, there is no Portuguese version.</div>}
      {lang==="zh_TW" && noZH && <div className='text-center'>抱歉，此文章並未提供中文版本</div>}
      {lang==="en_US" && noEN && <div className='text-center'>Sorry, there is no English version.</div>}
    </div>
  )
}
