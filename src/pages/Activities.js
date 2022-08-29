import axios from 'axios'
import React from 'react'
import { umallAPI } from '../utils/apiMap'
import { useState } from 'react'

export default function Activities() {
  let [activitiesList, setActivitiesList] = useState([])

  const getData = async ()=>{
    await axios.get(umallAPI.activities).then(
      response=>console.log(response)
    )
  }

  return (
    <div>
      <h1>Activities</h1>
      <button onClick={getData}>Get data</button>
    </div>
  )
}
