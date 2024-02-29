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
    ArrowUpIcon,
} from "@heroicons/react/24/solid";
import moment from 'moment';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";
import { act } from 'react-three-fiber';
import { Form } from 'react-hook-form';


// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

const ActivityDetail = () => {
    const [activityData, setActivityData] = useState(null);     // 活動數據

    const [isEditMode, setEditMode] = useState(false);          // 是否為編輯模式

    /* -------------------------------編輯狀態--------------------------------*/
    // 標題和封面圖
    const [m_title, setTitle] = useState(null);                 //社團名稱
    const [m_coverImage, setCoverImage] = useState(null);

    // 基本訊息
    const [m_sDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));   // 開始日期
    const [m_sTime, setStartTime] = useState(moment(new Date()).format("HH:MM"));        // 開始時間
    const [m_eDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));     // 結束日期
    const [m_eTime, setEndTime] = useState(moment(new Date()).format("HH:MM"));          // 結束時間

    const [m_location, setLocation] = useState(null);                           // 地點
    const [m_link, setLink] = useState(null);
    const [m_type, setType] = useState("ACTIVITY");

    // 簡介
    const [m_intro, setIntro] = useState(null);                       // 描述

    // 相關圖片
    const [m_relatedImages, setAddedRelatedImages] = useState(null);     // 暫存活動圖片


    // 從本地緩存中獲取活動資料
    const fetchActivityData = () => {
        var curActivityInfo = JSON.parse(localStorage.getItem("CurActivity"));
        setActivityData(curActivityInfo);
        if (curActivityInfo) {
            // 封面和標題
            curActivityInfo.m_title && setTitle(curActivityInfo.m_title);
            //createdActivityInfo.m_coverImage && setCoverImage(createdActivityInfo.m_coverImage);

            // 基本訊息
            curActivityInfo.m_sDate && setStartDate(curActivityInfo.m_sDate);
            curActivityInfo.m_sTime && setStartTime(curActivityInfo.m_sTime);
            curActivityInfo.m_eDate && setEndDate(curActivityInfo.m_eDate);
            curActivityInfo.m_eTime && setEndTime(curActivityInfo.m_eTime);
            curActivityInfo.m_location && setLocation(curActivityInfo.m_location);
            curActivityInfo.m_link && setLink(curActivityInfo.m_link);
            curActivityInfo.m_type && setType(curActivityInfo.m_type);

            // 簡介
            curActivityInfo.m_intro && setIntro(curActivityInfo.m_intro);
        }
    }

    // 開始編輯
    const startEdit = () => {
        setEditMode(true);
    }

    // 放棄編輯
    const discardEdit = () => {
        setEditMode(false);
    }

    // 保存編輯
    const saveEdit = () => {

    }

    // 上傳編輯
    const uploadEdit = () => {
        // TODO: 調用API上傳， commit & push

        // 如果上傳成功了就寫入localStorage，刷新頁面。

        setEditMode(false);
    }

    // 檢測是否被編輯過
    const isEdited = () => {

    }

    // 刪除活動
    const deleteActivity = async () => {
        let isUserConfirmDelete = confirm("確定要刪除這個活動嗎？這個操作無法撤銷。");
        if (!isUserConfirmDelete) {
            return;
        }

        let URL = BASE_URI + POST.EVENT_DEL;
        let data = new FormData();
        data.append("id", activityData._id);

        await axios.post(URL, data, {
            withCredentials: true,
        }).then(resp => {
            let json = resp.data;
            console.log(json);
            if (json.message == "success") {
                window.location.href = "./clubInfo";
            } else {
                alert("删除活动失败");
            }
        }
        ).catch(err => {
            window.alert("刪除活動失敗，請重試！");
        });
    }

    /* -------------------------------圖片文件--------------------------------*/
    // 上傳相關圖片
    function handleFileChange(event, type) {
        if (type === "cover") {
            // 封面圖片
            //let image = URL.createObjectURL(event.target.files[0]);
            let imgFileObj = event.target.files[0];
            setCoverImage(imgFileObj);
        } else if (type === "relate") {
            // 相關圖片
            let imgRawArr = event.target.files;
            let imgArr = [];

            Object.keys(imgRawArr).map(
                key => {
                    imgArr.push(imgRawArr[key]);
                }
            );

            // 數組中已經有數據，就插入，不把原來的替換掉了
            if (m_relatedImages && m_relatedImages instanceof Array) {
                imgArr = m_relatedImages.concat(imgArr);
            }

            // 選擇圖片不能超過4張
            if (imgArr.length > 4) {
                window.alert("選擇圖片不能超過4張");
                return;
            }

            setRelatedImages(imgArr);
        }
        // console.log('type', type);
    }

    /*---------------------------------頁間導航--------------------------------*/
    // 返回社團詳情頁
    const returnToClubInfo = () => {
        window.location.href = "./clubInfo";
    }

    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        fetchActivityData();
    },
        []
    );

    const coverImageRef = useRef();
    const relateImageInputRef = useRef();


    return (


        <>
            <title>
                {activityData && activityData.title} - 詳情
            </title>

            <Container>
                {/* 頂欄*/}
                <div className="flex justify-between items-center mb-10 mb-5">
                    <div className="flex items-center  text-themeColor text-xl font-bold">
                        <div className="flex flex-col justify-center">
                            <ChevronLeftIcon className="w-5 h-5" />
                        </div>
                        <div
                            className=" hover:cursor-pointer hover:opacity-50"
                            onClick={returnToClubInfo}>
                            返回{activityData && activityData.club_name}
                        </div>
                    </div>
                    <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                        <ThemeChanger />
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* 社團名字+活動標題*/}
                <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                    <h3 className="text-xl mb-3">
                        {activityData && activityData.club_name}
                    </h3>
                    {!isEditMode ? (
                        <h1 className="text-3xl">
                            {activityData && activityData.title}
                        </h1>
                    ) : (
                        <input
                            placeholder={"活動名稱"}
                            defaultValue={activityData && activityData.title}
                            className="text-3xl border-4 border-themeColor rounded-lg h-10 p-2"
                            onChangeCapture={(event) => setTitle(event.target.value)}>
                        </input>
                    )}
                </div>

                {/* 封面圖片 */}
                <div className="flex flex-col items-center mb-5">
                    <img
                        className="w-96 shadow-lg rounded-xl"
                        style={{ backgroundColor: '#fff' }}
                        src={activityData && BASE_HOST + activityData.cover_image_url} />
                </div>

                {/*操作陣列*/}
                <div className="flex items-center justify-center my-10">
                    {/* 編輯按鈕*/}
                    <div className="flex items-center justify-center mx-5" onClick={isEditMode ? discardEdit : startEdit}>
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <PencilSquareIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                {isEditMode ? <span>取消編輯</span> : <span>編輯</span>}
                            </div>
                        </div>
                    </div>
                    {/* 刪除按鈕*/}
                    {isEditMode && (
                        <div className="flex items-center justify-center mx-5" onClick={deleteActivity}>
                            <div className="grid grid-cols-2  bg-alert py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                                <div className="flex flex-col justify-center">
                                    <TrashIcon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span>刪除</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 編輯提醒*/}
                {isEdited() ? (
                    <div class="font-bold text-warning">
                        <p>
                            您有編輯待上傳，刷新就會失效！
                        </p>
                    </div>
                ) : (
                    <div class="font-bold text-success">
                        <p>
                            所有編輯均已上傳！
                        </p>
                    </div>
                )}

                {/* 時間和介紹 */}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
                    {/*開始和結束時間*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>
                        {/* 開始時間和結束時間*/}
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
                        {/* 地點 */}
                        <p>
                            <span className="text-themeColor font-bold">
                                地點:{'  '}
                            </span>
                            {!isEditMode ? (activityData && activityData.location) : (
                                <input
                                    placeholder={"地點"}
                                    defaultValue={activityData && activityData.location}
                                    className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                    onChangeCapture={(event) => setLocation(event.target.value)}>
                                </input>
                            )}
                        </p>
                        {/* 活動類型*/}
                        <p>
                            <span className="text-themeColor font-bold">
                                類型:{'  '}
                            </span>
                            {!isEditMode ? (activityData && activityTypeMap[activityData.type]) : (
                                <input
                                    placeholder={"地點"}
                                    defaultValue={activityData && activityTypeMap[activityData.type]}
                                    className="text-lg border-4 border-themeColor rounded-lg h-10 p-2">
                                </input>
                            )}
                        </p>
                    </div>

                    {/*活動介紹*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">簡介</h3>
                        </div>
                        {!isEditMode ? (
                            <p className="text-ellipsis overflow-hidden">
                                {activityData && activityData.introduction}
                            </p>
                        ) : (
                            <textarea
                                placeholder={"簡介"}
                                className="text-lg block w-full border-4 border-themeColor rounded-lg p-2 resize-none min-h-32"
                                rows="10"
                                onChangeCapture={(event) => setIntro(event.target.value)}>
                                {activityData && activityData.introduction}
                            </textarea>
                        )}
                    </div>

                </div>

                {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                {activityData && (activityData.relate_image_url.length > 0 || isEditMode) &&
                    (
                        <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                            <div className="mb-3">
                                <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                            </div>
                            <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">
                                {/* 一般的相關圖片 */}
                                {activityData && activityData.relate_image_url.map((item, index) => (
                                    <div key={index} className="flex flex-col mb-4 hover:cursor-pointer hover:opacity-80">
                                        <a href={BASE_HOST + item} target="_blank">
                                            <img src={BASE_HOST + item} className="rounded-lg" style={{ backgroundColor: '#fff' }} />
                                        </a>
                                    </div>
                                ))}
                                {/* 添加圖片模塊：僅在編輯圖片時展示 */}
                                {
                                    isEditMode && (
                                        <div className="flex flex-col items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                                            onClick={event => relateImageInputRef.current.click()}>
                                            <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                ref={relateImageInputRef}
                                                onChange={event => handleFileChange(event, "relate")}
                                                className="flex w-full h-full hidden"
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            {/* 添加的圖片名稱，編輯時展示 */}
                            <div>
                                {
                                    isEditMode && (
                                        <div className="flex items-center">
                                            <p className="font-bold text-lg">
                                                添加的圖片：
                                            </p>
                                            <span>
                                                {m_relatedImages && m_relatedImages.name}
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}

                {/*操作陣列*/}
                {isEditMode && (
                    <div className="flex items-center justify-center my-10">
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
                )}
            </Container>
            <Footer />
        </>
    );
}

export default ActivityDetail;