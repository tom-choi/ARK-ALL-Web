import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { umallAPI, baseURL } from '../utils/apiMap';
import { color } from '../utils/uiMap';
import { organizationsType } from '../utils/langMap';
import Loading from "../pages/Loading";

export default function ShowOrganizations() {
    const [isLoading, setLoading] = useState(true)
    let params = useParams()
    let [club, setClub] = useState({})
    let reqURL = umallAPI.getClub + params.id
    console.log(reqURL);
    let [img, setImg] = useState({})
    let [imgExist, setImgExist] = useState(true)

    useEffect(() => {
        axios.get(reqURL).then(
            res => {
                let clubData = res.data.content;
                setImg(baseURL + clubData.club_photos_list[0]);
                clubData.club_num = clubData.club_num.toString().padStart(3, '0')
                setClub(clubData);
                if (clubData.club_photos_list[0] === undefined)
                    setImgExist(false);
                console.log("data", clubData);
                console.log("club", club);
                console.log("img", img);
                setLoading(false);
            }
        )
    }, []
    )

    if (isLoading) {
        return <div><Loading></Loading></div>;
    }

    return (
        <div>
            {imgExist ? <img src={img} /> : ""}
            <div className='p-4 bg-white shadow'>
                <div className='flex flex-row'>
                    <div className='flex flex-wrap content-center'>
                        <img src={baseURL + club.logo_url} style={{ borderRadius: "50%", maxWidth: "3.25rem", minHeight: "3.25rem" }} className="shadow-md"></img>
                    </div>
                    <div className='flex flex-wrap content-center'>
                        <div className='ml-3'>
                            <span className='text-lg font-semibold align-top '>{club.name}</span>
                            <br />
                            <span className='text-sm rounded-md border shadow-xs p-1 align-bottom text-white bg-blue-500'>
                                #{organizationsType[club.tag]}
                            </span>
                            <span className='ml-1 text-sm rounded-md border shadow-xs p-1 align-bottom'>@{club.club_num}</span>
                        </div>
                    </div>
                </div>
                <hr className='mt-4'/>
                <div className='mt-3'>
                    <p>{club.intro}</p>
                </div>
            </div>
            <div className='mt-2 p-4 bg-white shadow'>
                <p style={{ color: color.theme }} className="font-bold">詳情</p>
                <hr className='my-2' />

            </div>
        </div>
    )
}
