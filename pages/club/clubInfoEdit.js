// 包引用
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    PlusCircleIcon,
    MinusCircleIcon,
    ArrowUpIcon
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';

// UI組件
import NavBarSecondary from '../../components/navBarSecondary';
import { ContentBlock } from '../../components/uiComponents/ContentBlock';
import { ListImage, ListImageAdd } from '../../components/uiComponents/ListImage';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { StdButton } from '../../components/uiComponents/StdButton';

// 工具函數
import { upload } from '../../utils/functions/u_server';
import { handleFileDelete } from '../../utils/functions/u_fileHandle';

// 設定
import { customSettings } from '../../utils/settings';

let del_club_image = [];
export default function clubInfoEdit() {
    const [clubData, setClubData] = useState(null);

    const [m_intro, setIntro] = useState('');
    const [m_contact, setContact] = useState([]);

    const [m_clubImages, setClubImages] = useState(null);
    const relateImageInputRef = useRef();

    useEffect(async () => {
        let clubInfo = JSON.parse(localStorage.getItem("ClubData")).content;

        // 獲取當前Club的Info
        const getData = async (clubNum) => {
            await axios
                .get(BASE_URI + GET.CLUB_INFO_NUM + clubNum)
                .then(res => {
                    let json = res.data;
                    if (json.message == 'success') {
                        setClubData(json.content);
                        localStorage.setItem("ClubData", JSON.stringify(json));
                        console.log(json.content);
                    }
                })
                .catch(err => {
                    console.log('err', err);
                    alert('无法获取当前社团讯息！');
                });
        };
        getData(clubInfo.club_num);

        fetchClubDataFromLocalStorage();
    }, []);

    /**
     * 联系人列表 - 無用
     * @deprecated
     */
    const contactListRef = useRef();

    /**
     * 從本地存儲中獲取社團訊息。
     * @returns {Object} 社團訊息
     */
    const fetchClubDataFromLocalStorage = () => {
        let curClubInfo = JSON.parse(localStorage.getItem("ClubData")).content;
        console.log('clubData', curClubInfo);

        setClubData(curClubInfo);

        if (curClubInfo) {
            curClubInfo.intro && setIntro(curClubInfo.intro);
            curClubInfo.contact && setContact(curClubInfo.contact);
            curClubInfo.club_photos_list && setClubImages(curClubInfo.club_photos_list);
        }

        console.log(m_intro);

        return curClubInfo;
    }

    /**
     * 獲取當前頁面輸入元素之表單
     * @returns {FormData} 匯總後的表單
     */
    const getUploadEditClubInfoFormData = () => {
        let baseHostLen = customSettings.is_local_test ? 0 : BASE_HOST.length;

        let data = new FormData();
        data.append('intro', m_intro);
        if (m_contact) {
            data.append('contact', JSON.stringify(m_contact));
        } else {
            data.append('contact', '[]');
        }

        // 社團圖片 - 增加
        let add_club_image = m_clubImages.filter(item => typeof item == 'object');
        if (add_club_image.length > 0) {
            add_club_image.map((imageFileObj) => {
                data.append('add_club_photos', imageFileObj);
            })
        } else {
            data.append('add_club_photos', '[]');
        }

        // 社團圖片 - 減少
        if (del_club_image.length > 0) {
            let delURL = [];
            del_club_image.map(imageURL => {
                let thisURL = imageURL.slice(0);
                delURL.push(thisURL);
            });
            data.append('del_club_photos', JSON.stringify(delURL));
        }
        else {
            data.append('del_club_photos', '[]');
        }

        return data;
    }

    /**
     * 上傳改動後的資料
     */
    const uploadEdit = async () => {
        let uploadFormData = getUploadEditClubInfoFormData();

        await upload(uploadFormData, BASE_URI + POST.CLUB_EDIT_INFO, '', './clubInfo');
    }


    /**
     * 刪除圖片
     * @param {event} e 刪除圖片事件 
     * @param {int} indexToRemove 刪除圖片的序號
     */
    const handleClubImgDelete = (e, indexToRemove) => {
        // 當前圖片URL
        let curImage = m_clubImages[indexToRemove];

        // 數組越界，通常情況下不會發生
        if (curImage == void 0 || indexToRemove >= m_clubImages.length) {
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
            del_club_image.push(curImage);
            return;
        }

        // 單純刪除本地數組中存儲的即可
        const updatedImageArr = m_clubImages;

        // 當前只刪除本地圖片
        updatedImageArr.splice(indexToRemove, 0 + isCurImgInServer);
        updatedImageArr.push('');
        setClubImages(updatedImageArr);
    }

    return (
        <Container>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation="./clubInfo" returnStr={'社團訊息'}></NavBarSecondary>

            {/* 基礎訊息 */}
            <ContentBlock title="基礎訊息" condition={true}>
                {/* 活動簡介 （Intro） */}
                <SecondTitle>活動簡介</SecondTitle>
                <textarea
                    placeholder={"活動簡介"}
                    defaultValue={m_intro}
                    className="border-4 border-themeColor rounded-lg h-10 p-2"
                    onChangeCapture={(e) => setIntro(e.target.value)}>
                </textarea>

                {/* 聯係方式 */}
                <SecondTitle>聯絡方式</SecondTitle>

                <ul ref={contactListRef}>
                    {
                        m_contact && m_contact.map((item, index) => (
                            <div key={index}>
                                <p>聯絡方式{" "}{index + 1}</p>
                                <div className="flex flex-row gap-5 align-middle">
                                    {/*方式：如email */}
                                    <input
                                        className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                        placeholder={"聯絡方式"}
                                        defaultValue={item.type}
                                        onChangeCapture={(e) => {
                                            setContact(prevContact => {
                                                const newContact = [...prevContact];
                                                newContact[index].type = e.target.value;
                                                return newContact;
                                            });
                                        }}>
                                    </input>

                                    {/*内容：如example@example.com */}
                                    <input
                                        className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                        placeholder={"内容"}
                                        defaultValue={item.num}
                                        onChangeCapture={(e) => {
                                            setContact(prevContact => {
                                                const newContact = [...prevContact];
                                                newContact[index].num = e.target.value;
                                                return newContact;
                                            });
                                        }}>
                                    </input>

                                    {/* TODO: 删除某项仍存在问题*/}
                                    <MinusCircleIcon
                                        className="w-10 h-10 text-alert hover:opacity-70 hover:cursor-pointer"
                                        onClick={() => {
                                            setContact(prevContact => {
                                                let newContact = [...prevContact];
                                                newContact.splice(index, 1);
                                                return newContact;
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </ul>

                {/* 添加聯係方式 */}
                <PlusCircleIcon
                    className="w-10 h-10 text-themeColor hover:opacity-70 hover:cursor-pointer"
                    onClick={() => {
                        setContact(prevContact => {
                            return [...prevContact, { "type": "", "num": "" }];
                        });
                    }} />

                <br />
            </ContentBlock>

            <StdButton
                onClickFunc={uploadEdit}
                textContent={'上傳'}
                Icon={ArrowUpIcon}></StdButton>

            {/* 照片 */}
            <p>照片修改 - 最多5張</p>
            <p>*首張圖片將作為主頁背景圖</p>

            {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
            <ContentBlock title="相關圖片" condition={true}>
                {/* 渲染具體相關圖片 */}
                <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                    {/* 相關圖片 */}
                    {m_clubImages && m_clubImages.map((item, index) =>
                        <ListImage
                            item={item}
                            index={index}
                            isEditMode={true}
                            handleImageDelete={handleClubImgDelete}>
                        </ListImage>
                    )}

                    <ListImageAdd
                        relateImageInputRef={relateImageInputRef}
                        imageList={m_clubImages}
                        setImageList={setClubImages}
                        fileNumLimit={5}>
                    </ListImageAdd>

                </div>
            </ContentBlock>

        </Container >
    )
}
