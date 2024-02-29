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

export default function clubInfoEdit() {
    const [clubData, setClubData] = useState(null);
    const [tempImgArr, setTempImgArr] = useState([null, null, null, null, null]);

    useEffect(() => {
        getData('0');
    }, [])

    // 返回社團詳情頁
    const returnToClubInfo = () => {
        // TODO: 返回前判斷是否有編輯中的內容
        // if (m_isEdited) {
        //     let isUserConfirmExit = confirm("您有未緩存的編輯！退出會導致編輯失效！是否保存後退出？");
        //     isUserConfirmExit && saveEdit();    // 用戶選擇保存
        // }
        window.location.href = "./clubInfo";
    }

    // 獲取當前Club的Info
    const getData = async clubNum => {
        await axios
            .get(BASE_URI + GET.CLUB_INFO_NUM + clubNum)
            .then(res => {
                let json = res.data;
                if (json.message == 'success') {
                    setClubData(json.content);
                    setData(json.content);
                }
            })
            .catch(err => {
                console.log('err', err);
            });
    };

    const setData = clubData => {
        console.log('clubData', clubData);
        // 渲染服務器已存的照片
        if (
            'club_photos_list' in clubData &&
            clubData.club_photos_list.length > 0
        ) {
            // let imgArr = clubData.club_photos_list;
            // let newImgArr = [];
            // // 不夠5張則補充
            // if (imgArr.length <= 5) {
            //     let pushArr = new Array(5 - imgArr.length).fill('');
            //     let arr = JSON.parse(JSON.stringify(imgArr));
            //     arr.push(...pushArr);
            //     newImgArr = JSON.parse(JSON.stringify(arr));
            // } else {
            //     newImgArr = JSON.parse(JSON.stringify(imgArr));
            // }
            // let addHostArr = [];
            // newImgArr.map(itm => {
            //     addHostArr.push(addHost(itm));
            // });
            // this.setState({ imageUrlArr: addHostArr });
        }
    }

    const handleImgSelect = (event) => {
        let fileObjArr = event.target.files;
        // 社團圖片最多5張，首張作為封面圖
        console.log('選擇的圖片ObjArr', fileObjArr);
    }

    // TODO: 
    // 簡介
    // 圖片
    // 聯繫

    return (
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
                            onClick={returnToClubInfo}
                        >
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

            {/* 照片 */}
            <p>照片修改 - 最多5張</p>
            <p>*首張圖片將作為主頁背景圖</p>

            <input type="file" accept="image/*" onChange={(event) => handleImgSelect(event)} />

            <br />
            <button type="submit" id="submitButton">submit</button>
        </Container >
    )
}
