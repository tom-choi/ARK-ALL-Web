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
import { customSettings } from '../../utils/settings';



// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

const NewActivity = () => {
    /*--------------------------------一般-------------------------------*/
    /*
        注：這裡的“是否編輯過”指的是修改過的信息是否存儲到本地了，跟雲端無關。
    */
    const [m_isEdited, setIsEdited] = useState(false);

    /* -------------------------------狀態數據--------------------------------*/
    // 標題和封面圖
    const [m_title, setTitle] = useState(null);                 // 社團名稱
    const [m_coverImage, setCoverImage] = useState(null);       // 封面圖片

    // 基本訊息
    const [m_sDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));   // 開始日期
    const [m_sTime, setStartTime] = useState(moment(new Date()).format("HH:MM"));   // 開始時間
    const [m_eDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));     // 結束日期
    const [m_eTime, setEndTime] = useState(moment(new Date()).format("HH:MM"));     // 結束時間

    const [m_location, setLocation] = useState(null);     // 地點
    const [m_link, setLink] = useState(null);               // 鏈接
    const [m_type, setType] = useState("ACTIVITY");             // 活動類型

    // 簡介
    const [m_intro, setIntro] = useState(null);

    // 相關圖片
    const [m_relatedImages, setRelatedImages] = useState(null);     // 暫存活動圖片


    /* -------------------------------編輯狀態--------------------------------*/
    const makeChange = (variable, value) => {
        setIsEdited(true);
        console.log(m_isEdited);

        switch (variable) {
            case "m_title": setTitle(value); break;
            //case "m_coverImage": setCoverImage(value); break;

            case "m_sDate": setStartDate(value); break;
            case "m_sTime": setStartTime(value); break;
            case "m_eDate": setEndDate(value); break;
            case "m_eTime": setEndTime(value); break;

            case "m_location": setLocation(value); break;
            case "m_link": setLink(value); break;
            case "m_type": setType(value); break;

            case "m_intro": setIntro(value); break;
        }
    }

    const isEditValidToSave = () => {
        let sDateTime = squashDateTime(m_sDate, m_sTime);
        let eDateTime = squashDateTime(m_eDate, m_eTime);
        let b = moment(sDateTime).isSameOrBefore(eDateTime);
        if (!b) {
            window.alert("結束時間應該在開始時間之後！");
        }
        return b;
    }

    const isEditValidToUpload = () => {
        // 除了“相關圖片”以外均是必須的
        return m_title && m_coverImage && m_sDate && m_sTime && m_eDate && m_eTime && m_location && m_type && m_intro;
    }


    const squashDateTime = (date, time) => {
        return date + "T" + time;
    }

    const saveEdit = () => {
        if (!isEditValidToSave())
            return;

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

        // 窗口提示
        window.alert("本地保存成功！");

        // 重置編輯狀態
        setIsEdited(false);
    }

    const discardEdit = () => {
        // 將localStorage中的相關數據清空
        localStorage.removeItem("createdActivityInfo");
        location.reload();
        // 窗口提示
        window.alert("本地保存已清空！");
        // 重置編輯狀態
        setIsEdited(false);
    }

    const uploadEdit = () => {
        if (!isEditValidToUpload()) {
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
    function handleFileChange(event, type) {
        if (type === "cover") {
            // 封面圖片
            let image = URL.createObjectURL(event.target.files[0]);
            setCoverImage(image);
        } else if (type === "relate") {
            // 相關圖片
            // 生數組，File Object
            let imgRawArr = event.target.files;
            imgRawArr = Array.prototype.slice.call(imgRawArr);    // 偽數組改成真數組
            // 熟數組，File URL
            let imgURLArr = [];
            imgRawArr.map(image => {
                let imgURL = URL.createObjectURL(image);
                imgURLArr.push(imgURL);
                console.log(imgURL);
            })
            // 數組中已經有數據，就插入，不把原來的替換掉了
            if (m_relatedImages && m_relatedImages instanceof Array) {
                imgURLArr = m_relatedImages.concat(imgURLArr);
            }
            setRelatedImages(imgURLArr);
        }
        console.log('type', type);
    }
    /*---------------------------------頁間導航--------------------------------*/
    // 返回社團詳情頁
    const returnToClubInfo = () => {
        if (m_isEdited) {
            let isUserConfirmExit = confirm("您有未緩存的編輯！退出會導致編輯失效！是否保存後退出？");
            isUserConfirmExit && saveEdit();    // 用戶選擇保存
        }
        window.location.href = "./clubInfo";
    }
    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        // TODO:初始化狀態數據,檢查localStorage中是否有保存編輯内容。
        restoreEdits();
    }, []);

    const coverImageRef = useRef();
    const relateImageInputRef = useRef();

    /*----------------------------------渲染-----------------------------------*/
    return (
        <>
            <Container>
                {/* 頂欄*/}
                <div className="w-full mb-5">
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
                    {/* 本地測試警告 */}
                    {customSettings.is_local_test && (
                        <div className="bg-alert pl-3 py-2">
                            <p><strong>警告:</strong> 您現在使用的是本地服務器。</p>
                        </div>
                    )}
                </div>

                {/* 輸入活動名稱 */}
                <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                    <input
                        placeholder={"活動名稱"}
                        defaultValue={m_title ? m_title : ""}
                        className="text-3xl border-4 border-themeColor rounded-lg h-10 p-2"
                        onChangeCapture={(event) => makeChange("m_title", event.target.value)}>
                    </input>
                </div>

                {/* 添加封面圖片*/}
                <div id="cover-img-placeholder" className="flex flex-col items-center mb-5" >
                    <div className="flex flex-col w-96 h-96 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                        onClick={() => coverImageRef.current.click()}
                    >
                        {!m_coverImage && (
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center justify-center mb-2">
                                    <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-themeColor">封面圖片</h3>
                                </div>
                            </div>
                        )}

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

                {/* 編輯提示 */}
                <div className="font-bold">
                    {m_isEdited ? (
                        <p className="text-warning">您有未保存的編輯！</p>
                    ) : (
                        <p className="text-success">所有編輯已保存到本地，記得上傳！</p>
                    )}
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
                                onChange={(event) => makeChange("m_type", event.target.value)}>
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
                                onChangeCapture={(event) => makeChange("m_sDate", event.target.value)} />
                            <input
                                type="time"
                                defaultValue={m_sTime ? m_sTime : moment(new Date()).format("HH:MM")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => makeChange("m_sTime", event.target.value)} />
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
                                onChangeCapture={(event) => makeChange("m_eDate", event.target.value)} />
                            <input
                                type="time"
                                defaultValue={m_eTime ? m_eTime : moment(new Date()).format("HH:MM")}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => makeChange("m_eTime", event.target.value)}
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
                                    onChangeCapture={(event) => makeChange("m_location", event.target.value)}>
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
                                    onChangeCapture={(event) => makeChange("m_link", event.target.value)}>
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
                                onChangeCapture={(event) => makeChange("m_intro", event.target.value)}>
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
                            {/* 一般的相關圖片 */}
                            {m_relatedImages && m_relatedImages.map((item, index) => (
                                <div key={index} className="flex flex-col mb-4 hover:cursor-pointer hover:opacity-80">
                                    <a href={item} target="_blank">
                                        <img src={item} className="rounded-lg" />
                                    </a>
                                </div>
                            ))}
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

                    </div>
                )}

                <div className="flex items-center justify-center my-10">
                    {/* 放棄*/}
                    <div className="flex items-center justify-center mx-5" onClick={discardEdit}>
                        <div className="flex bg-alert py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <TrashIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                <span>清空編輯</span>
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