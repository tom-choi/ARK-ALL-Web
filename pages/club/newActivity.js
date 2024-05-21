// 包引用
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    TrashIcon,
    FolderArrowDownIcon,
    PlusCircleIcon,
    ArrowUpIcon
} from "@heroicons/react/24/solid";
import moment from 'moment/moment';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import NavBarSecondary from '../../components/navBarSecondary';
import { handleFileChange } from '../../utils/functions/u_fileHandle';
import { upload } from '../../utils/functions/u_server';
import { squashDateTime } from '../../utils/functions/u_format';
import { ListImage, ListImageAdd } from '../../components/uiComponents/ListImage';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';

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
    const [m_sDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));  // 開始日期
    const [m_sTime, setStartTime] = useState(moment(new Date()).format("HH:MM"));       // 開始時間
    const [m_eDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));    // 結束日期
    const [m_eTime, setEndTime] = useState(moment(new Date()).format("HH:MM"));         // 結束時間

    const [m_location, setLocation] = useState(null);     // 地點
    const [m_link, setLink] = useState(null);             // 鏈接
    const [m_type, setType] = useState("ACTIVITY");       // 活動類型

    // 簡介
    const [m_intro, setIntro] = useState(null);

    // 相關圖片
    const [m_relatedImages, setRelatedImages] = useState(null);     // 暫存活動圖片

    /* -------------------------------編輯狀態--------------------------------*/
    /**
     * 統一的變更變量函數。
     * @param {*} variable 需要更改的變量名
     * @param {*} value 更改變量為目標值
     */
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
     * 檢測是否允許上傳。
     * @returns 布爾值：是否允許雲端
     */
    const isEditValidToUpload = () => {
        // 除了“相關圖片”以外均是必須的
        let isCommonDataFulfilled = (
            m_title && m_coverImage && m_sDate && m_sTime && m_eDate && m_eTime && m_type
        );

        if (!isCommonDataFulfilled) {
            window.alert("標題、封面、開始和結束的時間以及活動類型是必填項目！");
            return false;
        }

        let isLinkOrIntroFulfilled = m_type == "ACTIVITY" ? m_intro : m_link;

        if (!isLinkOrIntroFulfilled) {
            let hint = m_type == "ACTIVITY" ? "活動簡介" : "活動連結";
            window.alert(hint + "為必填項目");
            return false;
        }

        let isLocationFulfilled = m_type == "WEBSITE" || m_location;

        if (!isLocationFulfilled) {
            window.alert("地點為必填項目");
            return false;
        }

        return true;
    }

    /**
     * 保存編輯内容到本地。
     * @returns 
     */
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

    /**
     * 放棄本地編輯。
     */
    const discardEdit = () => {
        // 將localStorage中的相關數據清空
        localStorage.removeItem("createdActivityInfo");
        location.reload();
        // 窗口提示
        window.alert("本地保存已清空！");
        // 重置編輯狀態
        setIsEdited(false);
    }

    /**
     * 製作上傳表單
     * @returns 
     */
    const getUploadNewActivityFormData = () => {
        // 預處理一些數據
        let s_DateTime = squashDateTime(m_sDate, m_sTime, 'T');
        let e_DateTime = squashDateTime(m_eDate, m_eTime, 'T');

        // 將本地存儲的編輯數據上傳至伺服器
        let data = new FormData();
        data.append('title', m_title);
        data.append('type', m_type.toUpperCase());
        data.append('link', m_link ? m_link : "");

        // 圖片
        data.append('cover_image_file', m_coverImage);

        // 相关图片
        if (m_relatedImages) {
            m_relatedImages.map(image => {
                data.append('add_relate_image', image);
            });
        } else {
            data.append('add_relate_image', "[]");
        }

        // 開始和結束時間
        data.append('startdatetime', s_DateTime);
        data.append('enddatetime', e_DateTime);

        data.append('location', m_location ? m_location : "");
        data.append('introduction', m_intro);
        data.append('can_follow', 'true');

        return data;
    }

    /**
     * 異步上傳編輯内容到服務器。
     * @returns 
     */
    const uploadEdit = async () => {
        // 校驗輸入滿足要求
        let guard = isEditValidToUpload();

        // 获取上传表单
        let uploadFormData = getUploadNewActivityFormData();

        await upload(uploadFormData, BASE_URI + POST.EVENT_CREATE, 'createdActivityInfo', '../club/clubInfo', guard, true);
    }

    /**
     * 恢復存儲于本地的編輯内容。
     */
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

    /**
     * 刪除圖片。
     * @param {*} event 瀏覽器的事件，包含文件對象數組。
     * @param {*} indexToRemove 需要移除的項目。
     */
    function handleImageRemove(event, indexToRemove) {
        // 新的圖片數組
        const updatedImageArr = m_relatedImages.filter((item, index) => index != indexToRemove);
        setRelatedImages(updatedImageArr);
    }

    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        // TODO:初始化狀態數據,檢查localStorage中是否有保存編輯内容。
        restoreEdits();
    }, []);

    const coverImgContainer = useRef();
    const coverImgInput = useRef();
    const relateImageInputRef = useRef();

    /*----------------------------------渲染-----------------------------------*/
    return (
        <>
            <Container>
                {/* 頂欄*/}
                <NavBarSecondary returnLocation={'./clubInfo'} returnStr={'社團訊息'}></NavBarSecondary>

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
                    <div className={`flex flex-col w-96 h-96 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4`}
                        ref={coverImgContainer}
                        onClick={() => coverImgInput.current.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'copy';
                            coverImgContainer.current.style.opacity = 0.5
                        }}
                        onDragLeave={(e) => coverImgContainer.current.style.opacity = null}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files.length > 0) {
                                const file = e.dataTransfer.files[0];
                                if (file.type.startsWith('image/')) {
                                    // handleFileChange(e, 'cover', true);
                                    handleFileChange(e, m_coverImage, setCoverImage, true, true);
                                } else {
                                    alert('只支持图片上传！');
                                }
                            }
                        }}>
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
                            accept="image/*"
                            ref={coverImgInput}
                            onChange={(e) => handleFileChange(e, m_coverImage, setCoverImage, false, true)}
                            className="flex w-full h-full hidden"
                        />
                        {m_coverImage && (
                            <img
                                src={URL.createObjectURL(m_coverImage)}
                                className="h-96"
                            />
                        )}
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

                {/* 相關圖片 */}
                {m_type == "ACTIVITY" && (
                    // {/*相關圖片*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                        </div>
                        <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">

                            {/* 一般的相關圖片 */}
                            {m_relatedImages && m_relatedImages.map((item, index) => (
                                <ListImage item={item} index={index} isEditMode={true} handleImageDelete={handleImageRemove}></ListImage>
                            ))}

                            {/* 添加圖片模塊 */}
                            <ListImageAdd
                                relateImageInputRef={relateImageInputRef}
                                imageList={m_relatedImages}
                                setImageList={setRelatedImages}
                                fileNumLimit={4}>
                            </ListImageAdd>
                        </div>

                    </div>
                )}

                <StdButtonGrid>
                    {/* 放棄*/}
                    <StdButton color="bg-alert" onClickFunc={discardEdit} textContent={'清空編輯'} Icon={TrashIcon}></StdButton>

                    {/* 保存按鈕*/}
                    <StdButton color="bg-themeColor" onClickFunc={saveEdit} textContent={'本地保存'} Icon={FolderArrowDownIcon}></StdButton>

                    {/* 上傳*/}
                    <StdButton color="bg-themeColor" onClickFunc={uploadEdit} textContent={'上傳編輯'} Icon={ArrowUpIcon}></StdButton>
                </StdButtonGrid>

            </Container >
        </>
    );
};

export default NewActivity;