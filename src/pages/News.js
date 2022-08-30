import axios from 'axios'
import React from 'react'
import { umAPI } from '../utils/apiMap'
import { useState, useEffect } from 'react'
import Loading from "../pages/Loading";

//https://www.um.edu.mo/zh-hant/category/news-and-press-releases/

export default function News() {
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(umAPI.news, {
      headers: {
        Accept: 'application/json',
        Authorization: umAPI.token,
      },
    }).then(
      response => {
        console.log(response.data._embedded)
        setLoading(false);
      }
    )
  }, [])


  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div>
      <h1>News</h1>

    </div>
  )
}
