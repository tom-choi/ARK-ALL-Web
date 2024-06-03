// 包引用
import React, { useState, useEffect, useRef } from 'react';
import {
    PencilSquareIcon,
    TrashIcon,
    FolderArrowDownIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/solid";
import moment from 'moment';
import axios from 'axios';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import Footer from "../../components/footer";
import { upload } from "../../utils/functions/u_server";
import { handleFileChange } from '../../utils/functions/u_fileHandle';
import { squashDateTime } from '../../utils/functions/u_format';
import NavBarSecondary from '../../components/navBarSecondary';
import { ListImage, ListImageAdd } from '../../components/uiComponents/ListImage';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { data } from 'autoprefixer';
import { customSettings } from '../../utils/settings';


// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

let add_relate_image = [];
let del_relate_image = [];
let del_relate_image_index = [];

/**
 * 生產環境與開發環境Base Host長度不一樣
 */
let baseHostLen = customSettings.is_local_test ? 0 : BASE_HOST.length;

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
    const fetchActivityDataFromLocalStorage = () => {

        // 從本地存儲中獲取活動訊息
        var curActivityInfo = JSON.parse(localStorage.getItem("CurActivity"));
        setActivityData(curActivityInfo);


        if (curActivityInfo) {
            // 封面和標題
            curActivityInfo.title && setTitle(curActivityInfo.title);
            curActivityInfo.cover_image_url && setCoverImage(curActivityInfo.cover_image_url);
            curActivityInfo.relate_image_url && setRelatedImages(curActivityInfo.relate_image_url);
            // curActivityInfo.relate_image_url && console.log(curActivityInfo.relate_image_url);

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

            // 數據加載完畢，關閉lock
            setIsLoading(false);
        }

        console.log(curActivityInfo);

    }

    /**
     * 從網絡刷新活動數據
     */
    const refreshActivityData = async () => {
        // 獲取Activity ID
        let activityID = activityData._id;
        await axios({
            headers: { 'Content-Type': 'application/x-ww-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET.EVENT_INFO_EVENT_ID + activityID,
        }).then(resp => {
            let json = resp.data;
            if (json.message = 'success') {
                localStorage.setItem('CurActivity', JSON.stringify(json.content));
            } else {
                window.alert('無法獲取活動訊息！');
            }
        }).catch(err => {
            window.alert('網絡錯誤！');
        });
    }

    /**
     * 開始編輯
     */
    const startEdit = () => {
        console.log(m_relatedImages);
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
        // 析取数组中为object的项目，即爲要上傳的圖片
        let add_relate_image = m_relatedImages.filter(item => typeof item == 'object');
        if (add_relate_image.length > 0) {
            add_relate_image.map(imageFileObj => data.append('add_relate_image', imageFileObj));
        } else {
            data.append('add_relate_image', '[]');
        }

        // 相關圖片 - 減少
        if (del_relate_image.length > 0) {
            // 刪除後綴，根據21.07.30的後端標準，圖片需後端相對路徑
            let delURL = [];
            del_relate_image.map(imageURL => {
                let thisURL = imageURL.slice(baseHostLen);
                delURL.push(thisURL);
            });
            data.append('del_relate_image', JSON.stringify(delURL));
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

        // 刷新
        await refreshActivityData();
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
    /**
     * 刪除圖片
     * @param {event} e 刪除圖片事件 
     * @param {int} indexToRemove 刪除圖片的序號
     */
    const handleRelateImgDelete = (e, indexToRemove) => {
        // 當前圖片URL
        let curImage = m_relatedImages[indexToRemove];

        // 數組越界，通常情況下不會發生
        if (curImage == void 0 || indexToRemove >= m_relatedImages.length) {
            alert('刪除圖片錯誤，請聯絡開發者。');
            return;
        }

        // item為string: 服務器圖片；item為Object：本地圖片
        let isCurImgInServer = void 0;
        if (typeof curImage == 'object') {
            // 本地圖片
            isCurImgInServer = false;
        } else if (typeof curImage == 'string') {
            // 服務器圖片
            isCurImgInServer = true;
        } else {
            throw new Exception('圖片類型有誤！');
        }

        if (isCurImgInServer) {
            // 刪除服務器中的數組。不直接刪除，而是保留在數組中，最後上傳服務器刪除。保證數據庫裏的圖片長度一定。
            del_relate_image.push(curImage);
            del_relate_image_index.push(indexToRemove);
            return;
        }

        // 單純刪除本地數組中存儲的即可
        const updatedImageArr = m_relatedImages;

        // 當前只刪除本地圖片
        updatedImageArr.splice(indexToRemove, 0 + isCurImgInServer);
        updatedImageArr.push('');
        setRelatedImages(updatedImageArr);
    }


    /*---------------------------------初始化----------------------------------*/
    useEffect(() => {
        fetchActivityDataFromLocalStorage();

        // add_relate_image = [];
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

            <AfterLoading isLoading={isLoading}>
                <>
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
                            src={m_coverImage && typeof m_coverImage == 'object' ? URL.createObjectURL(m_coverImage) : BASE_HOST + m_coverImage}
                        />
                        {/* 更換圖片按鈕 */}
                        {isEditMode && (
                            <div className="absolute flex items-center justify-center mt-3">
                                <div className="flex flex-col bg-black text-white
                    text-xl p-3 rounded-lg text-center justify-center opacity-50 
                    hover:cursor-pointer hover:opacity-100"
                                    onClick={() => coverImageRef.current.click()}>
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
                    <StdButtonGrid>
                        {/* 編輯按鈕*/}
                        <StdButton color="bg-themeColor" onClickFunc={isEditMode ? discardEdit : startEdit} textContent={isEditMode ? '取消編輯' : '編輯'} Icon={PencilSquareIcon}></StdButton>

                        {/* 刪除活動按鈕*/}
                        <StdButton color="bg-alert" onClickFunc={deleteActivity} textContent={'刪除活動'} Icon={TrashIcon} condition={isEditMode}></StdButton>

                    </StdButtonGrid>

                    {/* 時間和介紹 */}
                    <ContentBlockGrid>
                        {/*開始和結束時間*/}
                        <ContentBlock title="基本訊息">
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
                        </ContentBlock>

                        {/*活動介紹*/}
                        <ContentBlock title="簡介">
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
                        </ContentBlock>
                    </ContentBlockGrid>

                    {/* TODO: Link類型 */}

                    {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                    <ContentBlock title="相關圖片" condition={activityData && (activityData.relate_image_url.length > 0 || isEditMode)}>
                        {/* 渲染具體相關圖片 */}
                        <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                            {/* 相關圖片 */}
                            {m_relatedImages && m_relatedImages.map((item, index) =>
                                del_relate_image_index.indexOf(index) == -1 && (
                                    <ListImage item={item} index={index} isEditMode={isEditMode} handleImageDelete={handleRelateImgDelete}></ListImage>
                                )
                            )}

                            {/* 添加圖片模塊：僅在編輯圖片時展示 */}
                            {isEditMode && (
                                <ListImageAdd
                                    relateImageInputRef={relateImageInputRef}
                                    imageList={m_relatedImages}
                                    setImageList={setRelatedImages}
                                    fileNumLimit={4}>
                                </ListImageAdd>
                            )}
                        </div>
                    </ContentBlock>


                    {/*操作陣列*/}
                    <StdButtonGrid condition={isEditMode}>
                        {/* 保存按鈕*/}
                        <StdButton onClickFunc={saveEdit} textContent={'本地保存'} Icon={FolderArrowDownIcon}></StdButton>

                        {/* 上傳*/}
                        <StdButton onClickFunc={uploadEdit} textContent={'上傳編輯'} Icon={ArrowUpIcon}></StdButton>
                    </StdButtonGrid>
                </>
            </AfterLoading>

        </Container>

        <Footer />
    </>);
}

export default ActivityDetail;