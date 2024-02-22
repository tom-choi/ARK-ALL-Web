// 包引用
import React, { useState, useEffect, useRef } from 'react';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"
import {
    PencilSquareIcon,
    TrashIcon,
    FolderArrowDownIcon,
    PlusCircleIcon,
    ChevronLeftIcon,
    ArrowUpIcon
} from "@heroicons/react/24/solid";
import moment from 'moment/moment';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";

// 返回社團詳情頁
const returnToClubInfo = () => {
    window.location.href = "./clubInfo";
}

// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

const NewActivity = () => {
    /*--------------------------------一般-------------------------------*/

    /* -------------------------------狀態數據--------------------------------*/
    // 標題和封面圖
    const [m_title, setTitle] = useState(null);                 // 社團名稱
    const [m_coverImage, setCoverImage] = useState(null);       // 封面圖片

    // 基本訊息
    const [m_sDate, setStartDate] = useState(null);   // 開始日期
    const [m_sTime, setStartTime] = useState(null);   // 開始時間
    const [m_eDate, setEndDate] = useState(null);     // 結束日期
    const [m_eTime, setEndTime] = useState(null);     // 結束時間

    const [m_location, setLocation] = useState(null);     // 地點
    const [m_link, setLink] = useState(null);               // 鏈接
    const [m_type, setType] = useState("ACTIVITY");             // 活動類型

    // 簡介
    const [m_intro, setIntro] = useState(null);

    // 相關圖片
    const [m_relatedImages, setRelatedImages] = useState(null);     // 暫存活動圖片


    /* -------------------------------編輯狀態--------------------------------*/
    const isEditValid = () => {
        // 除了“相關圖片”以外均是必須的
        return m_title && m_coverImage && m_sDate && m_sTime && m_eDate && m_eTime && m_location && m_type && m_intro;
    }

    const squashDateTime = (date, time) => {
        return date + "T" + time;
    }

    const saveEdit = () => {
        // 將數據匯總並存儲至localStorage

        // 數據匯總
        let createdActivityInfo = {
            m_title: m_title,
            //m_coverImage: m_coverImage,
            m_sDate: m_sDate,
            m_sTime: m_sTime,
            m_eDate: m_eDate,
            m_eTime: m_eTime,
            m_location: m_location,
            m_link: m_link,
            m_type: m_type,
            m_intro: m_intro,
            //m_relatedImages: m_relatedImages
        }

        // 存儲至localStorage
        localStorage.setItem("createdActivityInfo", JSON.stringify(createdActivityInfo));

        window.alert("本地保存成功！");
    }

    const giveUpEdit = () => {
        // 將localStorage中的相關數據清空
        localStorage.removeItem("createdActivityInfo");
        location.reload();
        window.alert("本地保存已清空！");
    }

    const uploadEdit = () => {
        if (!isEditValid()) {
            window.alert("請檢查内容！");
            return;
        }
        // 預處理一些數據
        let s_DateTIme = squashDateTime(m_sDate, m_sTime);
        let e_DateTime = squashDateTime(m_eDate, m_eTime);

        // 將本地存儲的編輯數據上傳至伺服器
    }

    const restoreEdits = () => {

        // 獲取localStorage中存儲的編輯
        let createdActivityInfo = JSON.parse(localStorage.getItem("createdActivityInfo"));

        console.log("本地緩存中保存的新建活動訊息：", createdActivityInfo);

        if (createdActivityInfo) {
            // 封面和標題
            createdActivityInfo.m_title && setTitle(createdActivityInfo.m_title);
            //createdActivityInfo.m_coverImage && setCoverImage(createdActivityInfo.m_coverImage);

            // 基本訊息
            createdActivityInfo.m_sDate && setStartDate(createdActivityInfo.m_sDate);
            createdActivityInfo.m_sTime && setStartTime(createdActivityInfo.m_sTime);
            createdActivityInfo.m_eDate && setEndDate(createdActivityInfo.m_eDate);
            createdActivityInfo.m_eTime && setEndTime(createdActivityInfo.m_eTime);
            createdActivityInfo.m_location && setLocation(createdActivityInfo.m_location);
            createdActivityInfo.m_link && setLink(createdActivityInfo.m_link);
            createdActivityInfo.m_type && setType(createdActivityInfo.m_type);

            // 簡介
            createdActivityInfo.m_intro && setIntro(createdActivityInfo.m_intro);

            // 相關圖片
            //createdActivityInfo.m_relatedImages && setRelatedImages(createdActivityInfo.m_relatedImages);
        }
    }

    /* -------------------------------圖片文件--------------------------------*/
    // 上傳相關圖片

    // 獲取選擇的文件並存儲File Object與state
    // const handleFileChange = (event, type) => {
    // const handleFileChange = ({ event }) => {
    //從File Input元素中獲取選中的文件
    // if (type === "cover") {
    //     setCoverImage(event.target.files[0]);
    //     console.log(m_coverImage);
    // }
    // else if (type === "relate") {
    //     setRelatedImages(event.target.files);
    //     console.log(JSON.stringify(m_relatedImages));
    // }
    // }
    function handleFileChange(event, type) {
        if (type === "cover") {
            console.log(event.target.files[0]);
            let image = URL.createObjectURL(event.target.files[0]);
            setCoverImage(image);
        } else if (type === "relate") {
            let imgArr = event.target.files;
            imgArr.map(i => {
                console.log(i);
            })
            setRelatedImages(event.target.files);
        }
        console.log('type', type);
    }

    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        // TODO:初始化狀態數據,檢查localStorage中是否有保存編輯内容。
        restoreEdits();
    }, []);

    const coverImageRef = useRef();
    const relateImageInputRef = useRef();

    console.log("Start Date Time ", squashDateTime(m_sDate, m_sTime));
    console.log("End Date ", m_eDate);

    console.log(moment(new Date()).format("YYYY/MM/DD"));
    console.log(m_sTime);

    return (
        <>
            <Container>
                {/* 頂欄*/}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center  text-themeColor text-xl font-bold">
                        <div className="flex flex-col justify-center">
                            <ChevronLeftIcon className="w-5 h-5" />
                        </div>
                        <div
                            className=" hover:cursor-pointer hover:opacity-50"
                            onClick={returnToClubInfo}>
                            返回主頁
                        </div>
                    </div>
                    <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                        <ThemeChanger />
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* 輸入活動名稱 */}
                <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                    <input
                        placeholder={"活動名稱"}
                        defaultValue={m_title ? m_title : ""}
                        className="text-3xl border-4 border-themeColor rounded-lg h-10 p-2"
                        onChangeCapture={(event) => setTitle(event.target.value)}>
                    </input>
                </div>

                {/* 添加封面圖片*/}
                <div id="cover-img-placeholder" className="flex flex-col items-center mb-5" >
                    <div className="flex flex-col w-96 h-96 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                        onClick={() => coverImageRef.current.click()}
                    >
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                        <h3 className="font-bold text-xl text-themeColor">封面圖片</h3>
                        <input
                            type="file"
                            accept=".png"
                            ref={coverImageRef}
                            onChange={(event) => handleFileChange(event, "cover")}
                            className="flex w-full h-full hidden"
                        />
                        <img
                            src={m_coverImage}
                        />
                    </div>
                </div>

                {/* 基本訊息 + 簡介 */}
                <div className={`
                    lg:grid 
                    ${m_type == "ACTIVITY" && `lg:grid-cols-2 `}
                    md:block
                    gap-4 
                    items-top 
                    justify-center mt-5
                `}>

                    {/*開始和結束時間*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">

                        {/*基本訊息標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>

                        {/* 活動類型*/}
                        <div className="flex items-center mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                類型:
                            </span>
                            <select className="text-lg border-4 border-themeColor rounded-lg p-2"
                                value={m_type}
                                onChangeCapture={(event) => setType(event.target.value)}>
                                <option value="ACTIVITY">{activityTypeMap['ACTIVITY']}</option>
                                <option value="WEBSITE">{activityTypeMap['WEBSITE']}</option>
                            </select>
                        </div>

                        {/* 開始時間*/}
                        <div className="mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                開始:
                            </span>
                            <input
                                type="date"
                                defaultValue={m_sDate ? m_sDate : moment(new Date()).format("YYYY-MM-DD")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setStartDate(event.target.value)} />
                            <input
                                type="time"
                                defaultValue={m_sTime ? m_sTime : moment(new Date()).format("HH:MM")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setStartTime(event.target.value)} />
                        </div>

                        {/* 結束時間*/}
                        <div className="mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                結束:
                            </span>
                            <input
                                type="date"
                                defaultValue={m_eDate ? m_eDate : moment(new Date()).format("YYYY-MM-DD")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEndDate(event.target.value)} />
                            <input
                                type="time"
                                defaultValue={m_eTime ? m_eTime : moment(new Date()).format("HH:MM")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEndTime(event.target.value)}
                            />
                        </div>

                        {/* 地點 */}
                        {m_type == "ACTIVITY" && (
                            <div className="mb-5">
                                <span className="text-themeColor font-bold mr-5">
                                    地點:
                                </span>
                                <input
                                    placeholder={"地點"}
                                    defaultValue={m_location ? m_location : ""}
                                    className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                    onChangeCapture={(event) => setLocation(event.target.value)}>
                                </input>
                            </div>
                        )}

                        {/* 鏈接 */}
                        {m_type == "WEBSITE" && (
                            <div className="mb-5">
                                <span className="text-themeColor font-bold mr-5">
                                    鏈接:
                                </span>
                                <input
                                    placeholder={"鏈接"}
                                    defaultValue={m_location ? m_location : ""}
                                    className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                    onChangeCapture={(event) => setLocation(event.target.value)}>
                                </input>
                            </div>
                        )}
                    </div>

                    {m_type == "ACTIVITY" && (
                        //{/*活動介紹*/ }
                        <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                            {/*標題*/}
                            <div className="mb-3">
                                <h3 className="text-xl font-bold text-themeColor">簡介</h3>
                            </div>
                            <textarea
                                placeholder={"簡介"}
                                defaultValue={m_intro ? m_intro : ""}
                                className="text-lg block w-full border-4 border-themeColor rounded-lg p-2 resize-none min-h-32"
                                rows="10"
                                onChangeCapture={(event) => setIntro(event.target.value)}>
                            </textarea>
                        </div>
                    )}
                </div>

                {m_type == "ACTIVITY" && (
                    // {/*相關圖片*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                        </div>
                        <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">

                            {/* 添加圖片模塊 */}
                            <div className="flex flex-col items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                                onClick={() => relateImageInputRef.current.click()}>
                                <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                                <input
                                    type="file"
                                    accept=".png "
                                    ref={relateImageInputRef}
                                    onChange={event => handleFileChange(event, "relate")}
                                    className="flex w-full h-full hidden"
                                    multiple
                                />
                            </div>
                        </div>

                        {/* 添加的圖片名稱，編輯時展示 */}
                        <div>
                            <div className="flex items-center">
                                <p className="font-bold text-lg">
                                    添加的圖片：
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center my-10">
                    {/* 放棄*/}
                    <div className="flex items-center justify-center mx-5" onClick={giveUpEdit}>
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <ArrowUpIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                <span>放棄改動</span>
                            </div>
                        </div>
                    </div>

                    {/* 保存按鈕*/}
                    <div className="flex items-center justify-center mx-5" onClick={saveEdit}>
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <FolderArrowDownIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                <span>本地保存</span>
                            </div>
                        </div>
                    </div>

                    {/* 上傳*/}
                    <div className="flex items-center justify-center mx-5" onClick={saveEdit}>
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <ArrowUpIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                <span>上傳改動</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Container >
        </>
    );
};

export default NewActivity;