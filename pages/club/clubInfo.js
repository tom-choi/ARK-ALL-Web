// 包引用
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"

// 本地引用
import { BASE_URI, BASE_HOST, GET } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';


const returnToMain = () => {
    window.location.href = "../";
}

const ClubInfo = () => {
    const [clubProfileData, setProfileData] = useState(null);   //登錄信息
    const [clubContentData, setContentData] = useState(null);   //社團內容，如聯繫方式等

    const getClubContent = async (curClubNum) => {
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET.CLUB_INFO_NUM + curClubNum,
        }).then(resp => {
            let json = resp.data;
            if (json.message == 'success') {
                console.log("獲取社團信息成功");
                //localStorage.setItem("ClubContentData",JSON.stringify(json));
                setContentData(json.content);
            }
            else{
                window.alert("獲取社團內容失敗，請刷新頁面！");
                console.log(resp);
            }
        }).catch(err => {
            window.alert("網絡錯誤！");
            console.log("獲取Content錯誤: ",err);
        });
    }

    useEffect(() => {
            const fetchedProfileData = localStorage.getItem("ClubData");
            if(fetchedProfileData){
                var profile = JSON.parse(fetchedProfileData);
                console.log(profile);
                setProfileData(profile);
                console.log("Content Data:" + clubContentData);
                getClubContent(profile.content.club_num);
            }
        },
        []
    );


    return (
        <>
        <title>
            社團編輯
        </title>
        <Container>
            <button
                className="mb-5 text-themeColor text-lg font-bold"
                onClick={returnToMain}>
                返回ARK官網
            </button>

            <div className="flex justify-center">
                {clubContentData && clubContentData.club_photos_list[0] ? (
                    <div key="0" className="flex flex-col mx-auto">
                        <img src={`${BASE_HOST + clubContentData.club_photos_list[0]}`} alt="club_photos" className="max-w-96 rounded-lg h-auto"/>
                    </div>
                ) : (
                    <p>Loading..</p>
                )}
            </div>

            <div className="flex bg-white dark:bg-gray-800 border-l-4 border-themeColorLight p-5 rounded-lg drop-shadow-md lg:items-center md:items-top  mt-5">
                {/*社團Logo*/}
                <img
                    className="w-24 h-24 rounded-full "
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

            {/* 社團內容展示 */}
            <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">

                {/*聯繫方式(只展示不為空的聯繫方式) */}
                <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                    {/*標題*/}
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-themeColor">聯繫方式</h3>
                    </div>
                    <ul>
                        {clubContentData?(
                            clubContentData.contact.filter(item => item.type && item.num).map((item, index) => (
                                <li key={index} >
                                    <div className="flex">
                                        <p className="text-themeColor font-bold">{item.type}{':\u00A0\u00A0'}</p>
                                        <p>{item.num}</p>
                                    </div>
                                </li>
                            ))
                        ):(
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
                        {clubContentData?(
                            clubContentData.club_photos_list.map((item, index) => (
                                <div key={index} className="flex flex-col mx-auto">
                                    <a href={BASE_HOST + item} target="_blank">
                                        <img src={BASE_HOST + item} alt="club_photos" className="md:max-w-24 sm:max-w-96 rounded-lg h-auto hover:cursor-pointer hover:opacity-50 hover:shadow-lg"/>
                                    </a>
                                </div>
                            ))
                        ):(
                            <p>
                                Loading..
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Container>
        </>
    );
}

export default ClubInfo;