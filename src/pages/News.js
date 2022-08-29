import axios from 'axios'
import React from 'react'
import { umAPI } from '../utils/apiMap'

//https://www.um.edu.mo/zh-hant/category/news-and-press-releases/

export default function News() {
   const getData = async () =>{
    await axios.get(umAPI.news,{
      headers: {
        Accept: 'application/json',
        Authorization: umAPI.token,
    },
    }).then(
      response =>{
        console.log(response.data._embedded)
      }
    )
  }
  return (
    <div>
      <h1>News</h1>
      <button onClick={getData}>Get data</button>
    </div>
  )
}
