import React from 'react'
import { useParams } from 'react-router-dom'
import { shortURLtoID } from '../utils/helper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { umallAPI } from '../utils/apiMap'

export default function ShowActivities() {
    let params = useParams()
    let id = shortURLtoID(params.id+"-").slice(0,-1)

    let [activity, setActivity] = useState([{a:"b"}])

    useEffect(() => {
        axios.get(umallAPI.activities+"/id/?id="+id).then(
          response => {
            setActivity(response.data.content);
            console.log(response.data.content);
          }
        )
      }, [])

    return (
        <div>
            <p>{activity.title}</p>
            <p>{activity.introduction}</p>
        </div>
    )
}
