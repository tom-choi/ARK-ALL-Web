// 包引用
import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"

// 本地引用
import { BASE_URI, BASE_HOST, GET } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";
import { act } from 'react-three-fiber';


const ActivityDetail = () => {
    const [activityData, setActivityData] = useState(null);

    const fetchActivityData = () => {
        var data = localStorage.getItem("CurActivity");
        data = JSON.parse(data);
        setActivityData(data);
        console.log(data);
    }

    useEffect(() => {
        fetchActivityData();
    },
        []
    );


    return (


        <>
            <title>
                {activityData && activityData.title} - 詳情
            </title>
            <Container>
                <div className="flex flex-col items-center text-themeColor font-bold">
                    <h3 className="text-xl mb-3">
                        {activityData && activityData.club_name}
                    </h3>
                    <h1 className="text-3xl">
                        {activityData && activityData.title}
                    </h1>
                </div>

                <div className="flex flex-col items-center mb-5">
                    <img
                        className="w-96 shadow-lg rounded-xl"
                        src={activityData && BASE_HOST + activityData.cover_image_url} />
                </div>

                {/*時間和介紹*/}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
                    {/*開始和結束時間*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>
                        <p>
                            <span className="text-themeColor font-bold">
                                Start:{'  '}
                            </span>
                            {activityData && activityData.timestamp}
                        </p>
                        <p>
                            <span className="text-themeColor font-bold">
                                End:{'  '}
                            </span>
                            {activityData && activityData.enddatetime}
                        </p>
                    </div>

                    {/*活動介紹*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">簡介</h3>
                        </div>
                        <p className="text-ellipsis overflow-hidden">
                            {activityData && activityData.introduction}
                        </p>
                    </div>

                </div>
                <p>
                    location: {activityData && activityData.location}
                </p>
                <h3> Related Images</h3>
                {activityData && activityData.relate_image_url.map((item, index) => (
                    <img src={BASE_HOST + item} />
                ))}

            </Container>
            <Footer />
        </>
    );
}

export default ActivityDetail;