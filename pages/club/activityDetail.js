// 包引用
import React, { useState, useEffect, useRef } from 'react';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';
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
import { upload } from "../../utils/functions/u_server";
import { handleFileChange } from '../../utils/functions/u_fileHandle';
import { squashDateTime } from '../../utils/functions/u_format';
import NavBarSecondary from '../../components/navBarSecondary';


// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

let add_relate_image = [];
let del_relate_image = [];

const ActivityDetail = () => {
    const [activityData, setActivityData] = useState(null);     // 活動數據

    const [isEditMode, setEditMode] = useState(false);          // 是否為編輯模式

    /* -------------------------------編輯狀態--------------------------------*/
    // 標題和封面圖
    const [m_title, setTitle] = useState("");
    const [m_coverImage, setCoverImage] = useState(null);

    // 基本訊息
    const [m_sDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));   // 開始日期
    const [m_sTime, setStartTime] = useState(moment(new Date()).format("HH:MM"));        // 開始時間
    const [m_eDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));     // 結束日期
    const [m_eTime, setEndTime] = useState(moment(new Date()).format("HH:MM"));          // 結束時間

    const [m_location, setLocation] = useState("");                           // 地點
    const [m_link, setLink] = useState("");
    const [m_type, setType] = useState("ACTIVITY");

    // 簡介
    const [m_intro, setIntro] = useState(null);                       // 描述

    // 相關圖片
    const [m_relatedImages, setRelatedImages] = useState(null);     // 暫存活動圖片

    // 動態變量
    const [isLoading, setIsLoading] = useState(true);

    /* -------------------------------編輯狀態--------------------------------*/

    /**
     * 檢測是否允許本地存儲。
     * @returns 布爾值：是否允許本地存儲
     */
    const isEditValidToSave = () => {
        let sDateTime = squashDateTime(m_sDate, m_sTime);
        let eDateTime = squashDateTime(m_eDate, m_eTime);
        let b = moment(sDateTime).isSameOrBefore(eDateTime);
        if (!b) {
            window.alert("結束時間應該在開始時間之後！");
        }
        return b;
    }

    /**
     * 從本地緩存中獲取資料
     */
    const fetchActivityData = () => {

        // 從本地存儲中獲取活動訊息
        var curActivityInfo = JSON.parse(localStorage.getItem("CurActivity"));
        setActivityData(curActivityInfo);

        if (curActivityInfo) {
            // 封面和標題
            curActivityInfo.title && setTitle(curActivityInfo.title);
            curActivityInfo.cover_image_url && setCoverImage(curActivityInfo.cover_image_url);

            // 基本訊息
            // TODO: 去除m_
            curActivityInfo.m_sDate && setStartDate(curActivityInfo.m_sDate);
            curActivityInfo.m_sTime && setStartTime(curActivityInfo.m_sTime);
            curActivityInfo.m_eDate && setEndDate(curActivityInfo.m_eDate);
            curActivityInfo.m_eTime && setEndTime(curActivityInfo.m_eTime);
            curActivityInfo.m_location && setLocation(curActivityInfo.m_location);
            curActivityInfo.m_link && setLink(curActivityInfo.m_link);
            curActivityInfo.m_type && setType(curActivityInfo.m_type);

            // 簡介
            curActivityInfo.m_intro && setIntro(curActivityInfo.m_intro);

            // 數據加載完畢，關閉lock
            setIsLoading(false);
        }
    }

    /**
     * 開始編輯
     */
    const startEdit = () => {
        setEditMode(true);
    }

    /**
     * 放棄編輯
     */
    const discardEdit = () => {
        setEditMode(false);
    }

    /**
     * 保存編輯
     */
    const saveEdit = () => {
        if (!isEditValidToSave()) return;
    }

    /**
     * 製作上傳表單
     */
    const getUploadEditActivityFormData = () => {
        // 預處理
        let s_DateTime = squashDateTime(m_sDate, m_sTime, 'T');
        let e_DateTime = squashDateTime(m_eDate, m_eTime, 'T');

        // TODO: 校驗滿足上傳要求
        // 獲取上傳表單
        let data = new FormData();
        data.append('id', activityData._id);
        data.append('title', m_title);
        data.append('type', m_type);
        data.append('link', m_link);

        // 封面圖片
        if (m_coverImage != activityData.cover_image_url) {
            // 此時m_coverImage是file類型
            data.append('cover_image_file', m_coverImage);
        }

        // 相關圖片 - 增加
        if (add_relate_image.length > 0) {
            add_relate_image.map(item => {
                data.append('add_relate_image', item);
            });
        } else {
            data.append('add_relate_image', '[]');
        }

        // 相關圖片 - 減少
        if (del_relate_image.length > 0) {
            // 刪除後綴，根據21.07.30的後端標準，圖片需後端相對路徑
            let delHostArr = [];
            del_relate_image.map(itm => {
                delHostArr.push(itm.slice(BASE_HOST.length));
            });
            del_relate_image = delHostArr;
            data.append('del_relate_image', JSON.stringify(del_relate_image),);
        } else {
            data.append('del_relate_image', '[]');
        }

        // 開始和結束時間
        data.append('startdatetime', s_DateTime);
        data.append('enddatetime', e_DateTime);
        data.append('loacation', m_location ? m_location : "");
        data.append('introduction', m_intro);
        data.append('can_follow', 'true');

        return data;
    }

    /**
     * 異步上傳編輯内容到服務器。
     * @returns 
     */
    const uploadEdit = async () => {
        // 獲取表單數據
        let uploadFormData = getUploadEditActivityFormData();

        // 上傳
        await upload(uploadFormData, BASE_URI + POST.EVENT_EDIT, '', './activityDetail');
        return;
    }

    /**
     * 刪除活動
     * @returns 
     */
    const deleteActivity = async () => {
        let isUserConfirmDelete = confirm("確定要刪除這個活動嗎？這個操作無法撤銷。");
        if (!isUserConfirmDelete) return;

        let URL = BASE_URI + POST.EVENT_DEL;
        let data = new FormData();
        data.append("id", activityData._id);

        await upload(data, URL, '', './clubInfo');
        return;
    }

    /* -------------------------------圖片文件--------------------------------*/

    // TODO: 圖片刪除
    const handleImageDelete = (index) => {
        // 如果選擇刪除的圖片處於服務器數據中，上傳需刪除圖片的資訊
        // TODO: 需刪除add image數組中的對應圖片
        let imageUrlArr = m_relatedImages;
        if ('relate_image_url' in activityData &&
            index + 1 <= activityData.relate_image_url.length
        ) {
            console.log('需刪已儲存數組');
            // del_relate_image.push(imageUrlArr[index]);
        } else {
            console.log('需刪除add數組');
            // let indexOfAddArray = add_relate_image.indexOf(
            //     imageUrlArr[index],
            // );
            // add_relate_image.splice(indexOfAddArray, 1);
        }
        // imageUrlArr.splice(index, 1);
        // imageUrlArr.push('');
        // m_relatedImages(imageUrlArr);
    }


    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        fetchActivityData();

        add_relate_image = [];
        del_relate_image = [];

        return () => {
            add_relate_image = [];
            del_relate_image = [];
        }
    }, []);

    const coverImageRef = useRef();
    const relateImageInputRef = useRef();


    /*---------------------------------頁間導航--------------------------------*/
    return (<>
        <title>
            {activityData && activityData.title} - 詳情
        </title>

        <Container>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation="./clubInfo" returnStr={'社團訊息'}></NavBarSecondary>

            {!isLoading && (<>
                {/* 社團名字+活動標題*/}
                <div className="flex flex-col items-center text-themeColor font-bold mb-5">
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
                    {/* 社團名字 */}
                    <h3 className="text-xl mb-3">
                        {'By ' + (activityData && activityData.club_name)}
                    </h3>
                </div>

                {/* 封面圖片 */}
                <div className="flex flex-col items-center mb-5">
                    <img className="w-96 shadow-lg rounded-xl" style={{ backgroundColor: '#fff' }}
                        src={typeof m_coverImage == 'object' ? URL.createObjectURL(m_coverImage) : BASE_HOST + m_coverImage}
                    />
                    {/* 更換圖片按鈕 */}
                    {isEditMode && (<div className="absolute flex items-center justify-center mt-3">
                        <div className="flex flex-col bg-black text-white
                            text-xl p-3 rounded-lg text-center justify-center opacity-50 
                            hover:cursor-pointer hover:opacity-100"
                            onClick={() => coverImageRef.current.click()}
                        >
                            <p>更換</p>
                            <input
                                type="file"
                                accept="image/*"
                                ref={coverImageRef}
                                onChange={event => handleFileChange(event, m_coverImage, setCoverImage, false, true)}
                                className="w-full h-full hidden"
                            />
                        </div>
                        {activityData.cover_image_url != m_coverImage && (
                            <div className="ml-5 flex flex-col bg-black text-white
                            text-xl p-3 rounded-lg text-center justify-center opacity-50 
                            hover:cursor-pointer hover:opacity-100"
                                onClick={() => setCoverImage(activityData.cover_image_url)}
                            >
                                <p>還原</p>
                            </div>
                        )}
                    </div>)}
                </div>

                {/*操作陣列*/}
                <div className="flex items-center justify-center my-10">
                    {/* 編輯按鈕*/}
                    <div className="flex items-center justify-center mr-5" onClick={isEditMode ? discardEdit : startEdit}>
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white 
                        hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <PencilSquareIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                {isEditMode ? <span>取消編輯</span> : <span>編輯</span>}
                            </div>
                        </div>
                    </div>
                    {/* TODO: 刪除活動按鈕*/}
                    {isEditMode && (
                        <div className="flex items-center justify-center ml-5" onClick={deleteActivity}>
                            <div className="flex bg-alert py-3 px-5 rounded-full text-white 
                            hover:opacity-50 hover:cursor-pointer">
                                <div className="flex flex-col justify-center">
                                    <TrashIcon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center ml-3">
                                    <span>刪除活動</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 時間和介紹 */}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
                    {/*開始和結束時間*/}
                    {/* TODO: 編輯時間 */}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>
                        {/* 開始時間和結束時間*/}
                        <p>
                            <span className="text-themeColor font-bold">
                                開始:{'  '}
                            </span>
                            {activityData && moment(activityData.timestamp).format("YYYY-MM-DD HH:mm")}
                        </p>
                        <p>
                            <span className="text-themeColor font-bold">
                                結束:{'  '}
                            </span>
                            {activityData && moment(activityData.enddatetime).format("YYYY-MM-DD HH:mm")}
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

                {/* TODO: Link類型 */}

                {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                {activityData && (activityData.relate_image_url.length > 0 || isEditMode) && (
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                        </div>
                        {/* 渲染具體相關圖片 */}
                        <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                            {m_relatedImages && m_relatedImages.map((item, index) => (
                                <div key={index} className="flex mb-4 items-center justify-center" >
                                    <img src={URL.createObjectURL(item)} className="rounded-lg border-themeColor border-4" />
                                    {/* 刪除按鈕 */}
                                    <div className="absolute flex flex-col 
                                    bg-black text-white
                                    text-xl p-3 rounded-lg text-center justify-center opacity-50 
                                    hover:cursor-pointer hover:opacity-100 hover:bg-alert"
                                        onClick={() => {
                                            if (confirm('確認刪除這張圖片嗎？')) {
                                                // TODO: 已存在服務器的，普通URL 文本類型
                                                // 克隆一次File Object，使用JSON會使File Object變為{}
                                                let arr = m_relatedImages.map(i => new File([i], i.name, { type: i.type }))
                                                arr.splice(index, 1);
                                                setRelatedImages(arr);
                                            }
                                        }}>
                                        <p>刪除</p>
                                    </div>
                                </div>
                            ))}
                            {/* 添加圖片模塊：僅在編輯圖片時展示 */}
                            {isEditMode && (m_relatedImages ? m_relatedImages.length < 4 : true) && (
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
                            )}
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
                        <div className="flex items-center justify-center mx-5" onClick={uploadEdit}>
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
            </>)}

        </Container>

        <Footer />
    </>);
}

export default ActivityDetail;