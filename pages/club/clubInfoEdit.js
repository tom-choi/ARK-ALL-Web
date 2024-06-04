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
import { u_handleFileDelete } from '../../utils/functions/u_fileHandle';

// 設定
import { customSettings } from '../../utils/settings';

let del_club_image = [];
export default function clubInfoEdit() {
    const [clubData, setClubData] = useState(null);

    const [m_intro, setIntro] = useState('');
    const [m_contact, setContact] = useState([]);

    const [m_clubImages, setClubImages] = useState(null);
    const relateImageInputRef = useRef();

    useEffect(() => {
        let clubInfo = JSON.parse(localStorage.getItem("ClubData")).content;

        // 獲取當前Club的Info，並存入localStorage
        const getData = async (clubNum) => {
            await axios
                .get(BASE_URI + GET.CLUB_INFO_NUM + clubNum)
                .then(res => {
                    let json = res.data;
                    if (json.message == 'success') {
                        setClubData(json.content);
                        localStorage.setItem("ClubData", JSON.stringify(json));

                    }
                })
                .catch(err => {
                    console.log('err', err);
                    alert('无法获取当前社团讯息！');
                });
        };
        getData(clubInfo.club_num).then(() => {
            fetchClubDataFromLocalStorage();
        });

    }, []);

    /**
     * 從本地存儲中獲取社團訊息。
     * @returns {Object} 社團訊息
     */
    const fetchClubDataFromLocalStorage = () => {
        let curClubInfo = JSON.parse(localStorage.getItem("ClubData")).content;

        setClubData(curClubInfo);

        if (curClubInfo) {
            curClubInfo.intro && setIntro(curClubInfo.intro);
            curClubInfo.contact && setContact(curClubInfo.contact);
            curClubInfo.club_photos_list && setClubImages(curClubInfo.club_photos_list);
        }

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

        await upload(uploadFormData, BASE_URI + POST.CLUB_EDIT_INFO, void 0, './clubInfo');
    }


    /**
     * 刪除圖片
     * @param {event} e 刪除圖片事件 
     * @param {int} indexToRemove 刪除圖片的序號
     */
    const handleClubImgDelete = (e, indexToRemove) => {
        u_handleFileDelete(e, indexToRemove, m_clubImages, setClubImages, (param) => {
            del_club_image.push(param);
            return;
        });
    }

    return (
        <Container>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation="./clubInfo" returnStr={'社團訊息'}></NavBarSecondary>

            <div className="flex flex-row gap-5">
                {/* 基礎訊息 */}
                <ContentBlock title="基礎訊息" condition={true}>
                    {/* 活動簡介 （Intro） */}
                    <SecondTitle>活動簡介</SecondTitle>
                    <textarea
                        placeholder={"活動簡介"}
                        defaultValue={m_intro}
                        className="border-4 border-themeColor rounded-lg h-10 p-2 w-full h-20"
                        onChangeCapture={(e) => setIntro(e.target.value)}>
                    </textarea>

                    {/* 聯係方式 */}
                    <SecondTitle>聯絡方式</SecondTitle>

                    <ul>
                        {
                            m_contact && m_contact.map((item, index) => item.num != void 0 && (
                                <div key={index}>
                                    <div className="flex flex-row gap-5 items-center mb-5">
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

                                        {/* 刪除某個聯係方式*/}
                                        <MinusCircleIcon
                                            className="w-10 h-10 text-alert hover:opacity-70 hover:cursor-pointer"
                                            onClick={(e) => {
                                                setContact(prevContact => {
                                                    let newContact = [...prevContact];
                                                    newContact[index].num = void 0;
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

                {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                <ContentBlock title="相關圖片" condition={true}>
                    <p>照片修改 - 最多5張</p>
                    <p>*首張圖片將作為主頁背景圖</p>
                    {/* 渲染具體相關圖片 */}
                    <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                        {/* 相關圖片 */}
                        {m_clubImages && m_clubImages.map((item, index) =>
                            <ListImage
                                key={index}
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

            </div>
            <StdButton
                onClickFunc={uploadEdit}
                textContent={'上傳'}
                Icon={ArrowUpIcon}></StdButton>

        </Container >
    )
}
