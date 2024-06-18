// 包引用
import React, { useState, useEffect } from 'react';
import {
    PencilSquareIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_HOST, GET } from '../../utils/pathMap';
import { getClubXX } from '../../lib/serverActions';
import { IClubSigninResponse, IGetActivitiesByClub, IGetClubInfo } from '../../types/index.d';

// UI組件
import NavBarSecondary from '../../components/navBarSecondary';
import Footer from "../../components/footer";
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import { ActivityCard } from '../../components/uiComponents/ActivityCard';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKMain, ContentBlock, ContentBlockGrid, IFELSE } from '../../components/uiComponents/ContentBlock';
import { ListImage } from '../../components/uiComponents/ListImage';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';

/**
 * 開發者注：clubProfileData只用於獲取club number。由於服務器端數據可能會更新，頁面會再一次通過club number請求一次數據。
 * 請不要用clubProfileData中除了club number以外的數據，否則可能會導致數據更新延遲。
 * @returns 
 */
const ClubInfo = () => {
    const [clubProfileData, setProfileData] = useState<IClubSigninResponse | undefined>(void 0);   //登錄信息
    const [clubContentData, setContentData] = useState<IGetClubInfo | undefined>(void 0);   //社團內容，如聯繫方式等
    const [clubActivities, setClubActivities] = useState<IGetActivitiesByClub | undefined>(void 0); //社團活動列表
    const [isLoadingClubContent, setIsLoadingClubContent] = useState(true);
    const [isLoadingActivity, setIsLoadingActivity] = useState(true);

    useEffect(() => {
        const fetchedProfileData = localStorage.getItem("ClubData");

        // 沒有獲取到club number，返回登錄頁
        if (!fetchedProfileData) {
            alert('請前往登陸賬號！');
            window.location.href = '../clublogin';
        }

        var profile: IClubSigninResponse = JSON.parse(fetchedProfileData as string);
        setProfileData(profile);

        // 根據已登錄的club ID 進一步獲取club的内容和活動
        getClubXX(profile.content.club_num, GET.CLUB_INFO_NUM, setContentData, '無法獲取社團信息！').then(() => {
            setIsLoadingClubContent(false);
        });
        getClubXX(profile.content.club_num, GET.EVENT_INFO_CLUB_NUM, setClubActivities, '無法獲取社團內容！', true).then(() => {
            setIsLoadingActivity(false);
        });

    }, []);

    return (
        <ARKMain title={clubProfileData?.content.name}>

            {/* 二級頂欄 */}
            <NavBarSecondary returnLocation={'../'} clearLocStorage />

            {/* 社團基本訊息 */}
            <AfterLoading isLoading={isLoadingClubContent}>
                {/* 歡迎詞 */}
                <div>
                    <h3 className="text-themeColor text-2xl font-bold text-center">
                        歡迎你，
                        {clubContentData?.content.name ? (clubContentData.content.name) : ("社團")}
                        負責人！
                    </h3>
                </div>

                {/* 封面圖 */}
                <div className="flex justify-center mt-10">
                    {clubContentData?.content.club_photos_list[0] ? (
                        <div key="0" className="flex flex-col mx-auto">
                            <img src={`${BASE_HOST + clubContentData.content.club_photos_list[0]}`} alt="club_photos" className="max-w-96 rounded-lg h-auto shadow-lg" style={{ backgroundColor: '#fff' }} />
                        </div>
                    ) : (
                        <p>無封面圖片</p>
                    )}
                </div>

                {/*操作陣列*/}
                <StdButtonGrid>
                    {/* 編輯按鈕*/}
                    <StdButton
                        color="bg-themeColor"
                        onClickFunc={() => { window.location.href = './clubInfoEdit'; }}
                        textContent={'編輯'}
                        Icon={PencilSquareIcon}>
                    </StdButton>

                    {/* 添加按鈕*/}
                    <StdButton
                        color="bg-themeColor"
                        onClickFunc={() => { window.location.href = "./newActivity"; }}
                        textContent={'新活動'}
                        Icon={PlusCircleIcon}>
                    </StdButton>
                </StdButtonGrid>

                {/* 社團訊息 */}
                <ContentBlock withTitle={false} className={"flex"}>
                    {/*社團Logo*/}
                    <img
                        className="w-24 h-24 rounded-full "
                        style={{ backgroundColor: '#fff' }}
                        src={BASE_HOST + (clubContentData && clubContentData.content.logo_url)}
                    />

                    {/*社團訊息*/}
                    <div className="ml-10">
                        {/* 社團名字*/}
                        <p className="text-xl text-themeColor font-bold">
                            {clubProfileData?.content.name}
                        </p>

                        {/* 社團Tag */}
                        <span className="text-themeColor bg-themeColorUltraLight rounded-full text-center px-3">
                            {clubProfileData && clubProfileData.content.tag}
                        </span>

                        {/* 社團簡介*/}
                        <p className="mt-3">
                            {clubContentData?.content.intro ? (clubContentData.content.intro) : ("該社團沒有留下簡介。")}
                        </p>
                    </div>
                </ContentBlock>

                {/* 社團內容展示（聯繫方式和圖片的分欄） */}
                <ContentBlockGrid>

                    {/*聯繫方式(只展示不為空的聯繫方式) */}
                    <ContentBlock title="聯繫方式">
                        <ul>
                            {clubContentData ? (
                                clubContentData.content.contact.filter(item => item.type && item.num).map((item, index) => (
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
                    </ContentBlock>

                    {/* 社團圖片 */}
                    <ContentBlock title="社團圖片">
                        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-4 ">
                            <IFELSE condition={clubContentData}>
                                {clubContentData?.content.club_photos_list.map((item, index) => (
                                    <ListImage
                                        key={index}
                                        item={item}
                                        index={index}
                                        isEditMode={false}>
                                    </ListImage>
                                ))}
                                <p>ARK全力加載中...</p>
                            </IFELSE>
                        </div>
                    </ContentBlock>
                </ContentBlockGrid>
            </AfterLoading>

            {/* 社團活動 */}
            <AfterLoading isLoading={isLoadingActivity}>
                <div className="px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                    {/*標題*/}
                    <SecondTitle>社團活動</SecondTitle>
                    {/* 渲染活動格子*/}
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
                        <IFELSE condition={clubActivities?.content?.length && clubActivities?.content?.length > 0}>
                            {clubActivities?.content.map((item, index) => (
                                <ActivityCard key={index} item={item} index={index}></ActivityCard>
                            ))}
                            <p>無活動</p>
                        </IFELSE>
                    </div>
                </div>
            </AfterLoading>

            {/*頁尾*/}
            <Footer />
        </ARKMain>
    );
}

export default ClubInfo;