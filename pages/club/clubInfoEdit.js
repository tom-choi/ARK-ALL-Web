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
import NavBarSecondary from '../../components/navBarSecondary';

export default function clubInfoEdit() {
    const [m_clubImages, setClubImages] = useState(null);

    const [clubData, setClubData] = useState(null);

    const relateImageInputRef = useRef();

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

    /**
     * 
     * @param {*} e 讀取文件事件，附帶一系列圖片文件 
     */
    function handleFileChange(e) {
        // Object數組
        let imgRawArr = e.target.files;
        let imgArr = [];

        // 將圖片推入數組
        Object.keys(imgRawArr).map(
            key => {
                imgArr.push(imgRawArr[key]);
            }
        );

        // 數組中已經有數據，就插入，不把原來的替換掉了
        if (m_clubImages && m_clubImages instanceof Array) {
            imgArr = m_clubImages.concat(imgArr);
        }

        // 選擇圖片不能超過五張
        if (imgArr.length > 5) {
            imgArr = imgArr.slice(0, 5);
            window.alert('選擇圖片不能超過五張！');
        }

        setClubImages(imgArr);

    }

    /**
     * 
     * @param {*} e 讀取文件事件
     * @param {*} indexToRemove 需要移除的文件的位置 
     */
    function handleImageRemove(e, indexToRemove) {
        // 新的圖片數組
        const updatedImageArr = m_clubImages.filter((item, index) => index != indexToRemove);
        setClubImages(updatedImageArr);
    }

    // TODO: 
    // 簡介
    // 圖片
    // 聯繫

    return (
        <Container>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation="./clubInfo"></NavBarSecondary>

            {/* 照片 */}
            <p>照片修改 - 最多5張</p>
            <p>*首張圖片將作為主頁背景圖</p>

            <input type="file" accept="image/*" onChange={(event) => handleImgSelect(event)} />

            <br />
            <button type="submit" id="submitButton">submit</button>

            {/*相關圖片*/}
            <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                </div>
                <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">

                    {/* 一般的相關圖片 */}
                    {m_clubImages && m_clubImages.map((item, index) => (
                        <div key={index} className="flex flex-col mb-4 items-center justify-center hover:cursor-pointer hover:opacity-80" >
                            <img src={URL.createObjectURL(item)} className="rounded-lg" />
                            <div className="absolute flex flex-col bg-black text-white text-2xl p-5 rounded-lg text-center justify-center w-64 h-48 opacity-0 hover:opacity-50"
                                onClick={(e) => handleImageRemove(e, index)}>
                                <p>刪除</p>
                            </div>
                        </div>
                    ))}

                    {/* 添加圖片模塊 */}
                    <div className="flex flex-col items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4"
                        onClick={() => relateImageInputRef.current.click()}>
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={relateImageInputRef}
                            onChange={(e) => handleFileChange(e)}
                            className="flex w-full h-full hidden"
                            multiple
                        />
                    </div>
                </div>

            </div>
        </Container>
    )
}
