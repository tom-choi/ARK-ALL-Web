// 包引用
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    PencilSquareIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_URI, BASE_HOST, GET } from '../../utils/pathMap';
import Container from '../../components/container';
import NavBarSecondary from '../../components/navBarSecondary';
import Footer from "../../components/footer";
import { parseTimeString } from '../../utils/functions/u_format';
import { StdButton } from '../../components/uiComponents/StdButton';


const toNewActivity = () => {
    window.location.href = "./newActivity";
}

const toClubInfoEdit = () => {
    window.location.href = './clubInfoEdit';
}

const ClubInfo = () => {
    const [clubProfileData, setProfileData] = useState(null);   //登錄信息
    const [clubContentData, setContentData] = useState(null);   //社團內容，如聯繫方式等
    const [clubActivities, setClubActivities] = useState(null); //社團活動列表
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchedProfileData = localStorage.getItem("ClubData");
        if (fetchedProfileData) {
            var profile = JSON.parse(fetchedProfileData);
            setProfileData(profile);

            // 根據已登錄的club ID 進一步獲取club的内容和活動
            getClubXX(profile.content.club_num, GET.CLUB_INFO_NUM, setContentData, '無法獲取社團信息！');
            getClubXX(profile.content.club_num, GET.EVENT_INFO_CLUB_NUM, setClubActivities, '無法獲取社團內容！');

            setIsLoading(false);
        } else {
            alert('請前往登錄賬號!');
            window.location.href = '../clublogin';
        }
    }, []);


    /**
     * 根據社團號碼獲取相關訊息
     * @param {*} curClubNum 當前帳號號碼
     * @param {string} GET_URL API路徑
     */
    const getClubXX = async (curClubNum, GET_URL, setFunc, alert = void 0) => {
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET_URL + curClubNum,
        }).then(resp => {
            let json = resp.data;
            if (json.message == 'success') {
                setFunc(json.content);
            } else if (alert) {
                window.alert(alert);
            }
        }).catch(err => {
            window.alert('網絡錯誤！');
        });
    }

    // 用戶點擊活動卡片跳轉到卡片詳情頁
    const onClickActivityCard = (event, activityData) => {
        localStorage.setItem("CurActivity", JSON.stringify(activityData));
        window.location.href = "activityDetail";
    }

    return (<>
        <title>
            {"社團-"}{clubProfileData && clubProfileData.content.name}
        </title>
        <Container>

            {/* 二級頂欄 */}
            <NavBarSecondary returnLocation={'../'} clearLocStorage>
            </NavBarSecondary>

            {!isloading ? (<>
                {/* 歡迎詞 */}
                <div>
                    <h3 className="text-themeColor text-2xl font-bold text-center">
                        歡迎你，
                        {clubProfileData && clubProfileData.content.name ? (clubProfileData.content.name) : ("社團")}
                        負責人！
                    </h3>
                </div>

                {/* 封面圖 */}
                <div className="flex justify-center mt-10">

                    {clubContentData && clubContentData.club_photos_list[0] ? (
                        <div key="0" className="flex flex-col mx-auto">
                            <img src={`${BASE_HOST + clubContentData.club_photos_list[0]}`} alt="club_photos" className="max-w-96 rounded-lg h-auto shadow-lg" style={{ backgroundColor: '#fff' }} />
                        </div>
                    ) : (
                        <p>你可以使用編輯功能補充此處的信息</p>
                    )}
                </div>

                {/*操作陣列*/}
                <div className="flex items-center justify-center my-10">
                    {/* 編輯按鈕*/}
                    <StdButton color="bg-themeColor" onClickFunc={toClubInfoEdit} textContent={'編輯'} Icon={PencilSquareIcon}></StdButton>
                    {/* 添加按鈕*/}
                    <StdButton color="bg-themeColor" onClickFunc={toNewActivity} textContent={'新活動'} Icon={PlusCircleIcon}></StdButton>
                </div>

                {/* 正文內容 */}
                <div className="flex bg-white dark:bg-gray-800 border-l-4 border-themeColorLight p-5 rounded-lg drop-shadow-md lg:items-center md:items-top  mt-5">
                    {/*社團Logo*/}
                    <img
                        className="w-24 h-24 rounded-full "
                        style={{ backgroundColor: '#fff' }}
                        src={BASE_HOST + (clubProfileData && clubProfileData.content.logo_url)}
                    />

                    {/*社團L訊息*/}
                    <div className="ml-10">
                        <p className="text-xl text-themeColor font-bold">
                            {clubProfileData && clubProfileData.content.name}
                        </p>
                        <span className="text-themeColor bg-themeColorUltraLight rounded-full text-center px-3">
                            {clubProfileData && clubProfileData.content.tag}
                        </span>
                        <p>
                            {clubProfileData && clubProfileData.content.intro}
                        </p>
                    </div>
                </div>

                {/* 社團內容展示（聯繫方式和圖片的分欄） */}
                {/* 這個內容做了響應式，其中不應再添加更多內容了。*/}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">

                    {/*聯繫方式(只展示不為空的聯繫方式) */}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">聯繫方式</h3>
                        </div>
                        <ul>
                            {clubContentData ? (
                                clubContentData.contact.filter(item => item.type && item.num).map((item, index) => (
                                    <li key={index} >
                                        <div className="flex">
                                            <p className="text-themeColor font-bold">{item.type}{':\u00A0\u00A0'}</p>
                                            <p>{item.num}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>
                                    Loading....
                                </p>
                            )}
                        </ul>
                    </div>

                    {/* 社團圖片 */}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">社團圖片</h3>
                        </div>

                        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-4 ">
                            {clubContentData ? (
                                clubContentData.club_photos_list.map((item, index) => (
                                    <div key={index} className="flex flex-col mx-auto">
                                        <a href={BASE_HOST + item} target="_blank">
                                            <img src={BASE_HOST + item} alt="club_photos" className="md:max-w-24 sm:max-w-96 rounded-lg h-auto hover:cursor-pointer hover:opacity-50 hover:shadow-lg" style={{ backgroundColor: '#fff' }} />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>
                                    Loading..
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 社團活動 */}
                <div className="px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                    {/*標題*/}
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-themeColor">社團活動</h3>
                    </div>
                    {/* 渲染活動格子*/}
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
                        {/* 渲染活動卡片 */}
                        {clubActivities && clubActivities.length > 0 ? (
                            clubActivities.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-themeColorUltraLight dark:bg-gray-800 flex flex-col p-3 rounded-lg mx-auto hover:cursor-pointer hover:shadow-lg"
                                    onClick={event => onClickActivityCard(event, item)}>

                                    <div className="flex flex-col lg:w-48 xl:w-64 md:w-48 sm:w-64 items-center">
                                        {/*活動封面*/}
                                        <img src={BASE_HOST + item.cover_image_url} alt="club_photos" className="hover:border-4 hover:cursor-pointer hover:border-themeColor hover:shadow-lg md:w-48 h-64 object-cover sm:max-w-64 rounded-lg mb-5 shadow-lg" style={{ backgroundColor: '#fff' }} />
                                        {/*活動描述*/}
                                        <div className="flex flex-col h-16 mb-3 mx-auto">
                                            <h3 className="text-themeColor text-xl text-center font-bold text-ellipsis overflow-hidden">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col  border-t-2 border-themeColorLight items-left font-bold text-themeColor opacity-80">
                                            <p className="text-left">
                                                🕐:
                                                {' '}
                                                {parseTimeString(item.enddatetime).Year}{'-'}
                                                {parseTimeString(item.enddatetime).Month}{'-'}
                                                {parseTimeString(item.enddatetime).Day}{' '}
                                                {parseTimeString(item.enddatetime).Hour}{':'}
                                                {parseTimeString(item.enddatetime).Minute}
                                            </p>
                                            <p className="text-left">
                                                🚩：{item.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>你可以使用編輯功能補充此處的信息</p>
                        )}
                    </div>
                </div>
                <Footer />
            </>) : null}

        </Container>
    </>);
}

export default ClubInfo;