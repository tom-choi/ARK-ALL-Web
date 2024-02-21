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

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";
import { act } from 'react-three-fiber';

// 返回社團詳情頁
const returnToClubInfo = () => {
    window.location.href = "./clubInfo";
}

const NewActivity = () => {
    // 標題和封面圖
    const [editActivityTitle, setEditActivityTitle] = useState(null);                 //社團名稱
    const [addedCoverImage, setAddedCoverImage] = useState(null);

    // 基本訊息
    const [editStartDate, setEditStartDate] = useState(null);   // 開始日期
    const [editStartTime, setEditStartTime] = useState(null);   // 開始時間
    const [editEndDate, setEditEndDate] = useState(null);       // 結束日期
    const [editEndTime, setEditEndTime] = useState(null);       // 結束時間

    const [editLoc, setEditLoc] = useState(null);               // 地點
    const [editType, setEditType] = useState(null);             // 活動類型、
    const activityTypeMap = {                                   // 活動類型映射
        "ACTIVITY": "普通活動",
        "OFFICIAL": "澳大官方",
        "WEBSITE": "網頁"
    };

    // 簡介
    const [editIntro, setEditIntro] = useState(null);

    //相關圖片
    const [addedRelatedImages, setAddedRelatedImages] = useState(null);     // 暫存活動圖片

    /* -------------------------------狀態數據--------------------------------*/

    /* -------------------------------編輯狀態--------------------------------*/
    const saveEdit = () => {
    }

    const giveUpEdit = () => {
    }

    const uploadEdit = () => {
    }

    /* -------------------------------圖片文件--------------------------------*/
    // 上傳相關圖片
    // 點擊上傳Placeholder
    const handleFileSelected = (event) => {
        // 獲取File Input元素並觸發點擊事件以打開文件選擇窗口
        fileInputRef.current.click();
    }

    //獲取選擇的文件並存儲與state
    const handleFileChange = (event) => {
        //從File Input元素中獲取選中的文件
        setAddedRelatedImages(event.target.files[0]);

        console.log(addedRelatedImages);
    }

    const fileInputRef = useRef();
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
                        className="text-3xl border-4 border-themeColor rounded-lg h-10 p-2"
                        onChangeCapture={(event) => setEditActivityTitle(event.target.value)}>
                    </input>
                </div>

                {/* 添加封面圖片*/}
                <div className="flex flex-col items-center mb-5">
                    <div className="flex flex-col w-96 h-96 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                        onClick={event => handleFileSelected()}>
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                        <h3 className="font-bold text-xl text-themeColor">封面圖片</h3>
                        <input
                            type="file"
                            accept=".png "
                            ref={fileInputRef}
                            onChange={event => handleFileChange(event)}
                            className="flex w-full h-full hidden"
                        />
                    </div>
                </div>

                {/* 時間和介紹 */}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
                    {/*開始和結束時間*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>
                        {/* 開始時間和結束時間*/}
                        <div className="mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                Start:
                            </span>
                            <input
                                type="date"
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEditStartDate(event.target.value)} />
                            <input
                                type="time"
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEditStartTime(event.target.value)} />
                        </div>

                        <div className="mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                End:
                            </span>
                            <input
                                type="date"
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEditEndDate(event.target.value)} />
                            <input
                                type="time"
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2 mr-3"
                                onChangeCapture={(event) => setEditEndTime(event.target.value)}
                            />
                        </div>

                        {/* 地點 */}
                        <div className="mb-5">
                            <span className="text-themeColor font-bold mr-5">
                                地點:
                            </span>
                            <input
                                placeholder={"地點"}
                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                onChangeCapture={(event) => setEditLoc(event.target.value)}>
                            </input>
                        </div>

                        {/* 活動類型*/}
                        <div className="flex items-center">
                            <span className="text-themeColor font-bold mr-5">
                                類型:
                            </span>
                            <select className="text-lg border-4 border-themeColor rounded-lg p-2"
                                onChangeCapture={(event) => setEditType(event.target.value)}>
                                <option value="ACTIVITY">{activityTypeMap['ACTIVITY']}</option>
                                <option value="OFFICIAL">{activityTypeMap['OFFICIAL']}</option>
                                <option value="WEBSITE">{activityTypeMap['WEBSITE']}</option>
                            </select>
                        </div>

                    </div>

                    {/*活動介紹*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">簡介</h3>
                        </div>
                        <textarea
                            placeholder={"簡介"}
                            className="text-lg block w-full border-4 border-themeColor rounded-lg p-2 resize-none min-h-32"
                            rows="10"
                            onChangeCapture={(event) => setEditIntro(event.target.value)}>
                        </textarea>
                    </div>


                </div>

                <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                    </div>
                    <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">

                        {/* 添加圖片模塊：僅在編輯圖片時展示 */}

                        <div className="flex flex-col items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                            onClick={event => handleFileSelected()}>
                            <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                            <input
                                type="file"
                                accept=".png "
                                ref={fileInputRef}
                                onChange={event => handleFileChange(event)}
                                className="flex w-full h-full hidden"
                            />
                        </div>


                    </div>

                    {/* 添加的圖片名稱，編輯時展示 */}
                    <div>
                        <div className="flex items-center">
                            <p className="font-bold text-lg">
                                添加的圖片：
                            </p>
                            <span>
                                {addedRelatedImages && addedRelatedImages.name}
                            </span>
                        </div>
                    </div>
                </div>

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

            </Container >
        </>
    );
};

export default NewActivity;