// 包引用
import React, { useState, useEffect, useRef } from 'react';
import {
    PencilSquareIcon,
    TrashIcon,
    FolderArrowDownIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/solid";
import moment from 'moment';

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


// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

let add_relate_image = [];
let del_relate_image = [];
let del_relate_image_index = [];

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
            curActivityInfo.relate_image_url && setRelatedImages(curActivityInfo.relate_image_url);
            // curActivityInfo.relate_image_url && console.log(curActivityInfo.relate_image_url);

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


    const handleImageDelete = (e, index) => {
        // TODO: 判斷圖片是否是服務器圖片，需要更好的方法
        let len = activityData.relate_image_url.length;
        let isCurImgInServer = index + 1 <= len;

        let imageUrlArr = m_relatedImages;

        if (isCurImgInServer) {
            // 刪除服務器中的數組
            del_relate_image.push(imageUrlArr[index]);
            del_relate_image_index.push(index);
        } else {
            // 單純刪除本地存儲數組即可
            // 新的圖片數組
            const updatedImageArr = m_relatedImages.filter((item, index) => index != indexToRemove);
            setRelatedImages(updatedImageArr);
        }
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
                                !del_relate_image_index.some(ele => ele == index) &&
                                (
                                    <ListImage item={item} index={index} isEditMode={isEditMode} handleImageDelete={handleImageDelete}></ListImage>
                                ))}

                            {/* 添加圖片模塊：僅在編輯圖片時展示 */}
                            {isEditMode && (m_relatedImages ? m_relatedImages.length < 4 : true) && (
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