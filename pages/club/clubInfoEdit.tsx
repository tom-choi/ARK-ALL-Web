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

// UI組件
import NavBarSecondary from '../../components/navBarSecondary';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { StdButton } from '../../components/uiComponents/StdButton';

// 工具函數
import { upload } from '../../utils/functions/u_server';

// 設定
import { SubmitHandler, useForm } from 'react-hook-form';
import { authGuard } from '../../lib/authentication';
import { appendListToFormData, createFormData, getClubXX } from '../../lib/serverActions';
import { IEditClubInfo, IGetClubInfo } from '../../types/index.d';
import { ARKListImageInput } from '../../components/uiComponents/Inputs';


export default function clubInfoEdit() {
    const [m_clubData, setClubData] = useState<IGetClubInfo>(null);

    const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm<IEditClubInfo>();
    const _del_club_photos = watch("del_club_photos");

    useEffect(() => {
        const clubNum = authGuard({ urlParamName: "club_num" });
        getClubXX(clubNum, GET.CLUB_INFO_NUM, setClubData, void 0, true);
    }, []);

    const onSubmit: SubmitHandler<IEditClubInfo> = async (_data: IEditClubInfo) => {

        // let fdata = createFormData(_data);

        // upload(fdata, BASE_URI + POST.CLUB_EDIT_INFO, void 0, `./clubInfo?club_num=${m_clubData?.content.club_num}`);

        // return;

        let fd = new FormData();

        //簡介
        fd.append("intro", watch("intro") || "");

        // 聯係方式
        appendListToFormData(fd, "contact", watch("contact"), "array");

        // 社團圖片 - 添加
        appendListToFormData(fd, "add_club_photos", watch("add_club_photos"), "object");

        // 社團圖片 - 減少
        appendListToFormData(fd, "del_club_photos", watch("del_club_photos"), "array");

        upload(fd, BASE_URI + POST.CLUB_EDIT_INFO, void 0, `./clubInfo?club_num=${m_clubData?.content.club_num}`);
    }

    return (
        <ARKMain title={"社團訊息編輯"}>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation={`./clubInfo?club_num=${m_clubData?.content.club_num}`} returnStr={'社團訊息'} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <ContentBlockGrid>
                    {/* 基礎訊息 */}
                    <ContentBlock title="基礎訊息" condition={true}>
                        {/* 活動簡介 （Intro） */}
                        <div>
                            <SecondTitle>活動簡介</SecondTitle>
                            <textarea
                                placeholder={"活動簡介"}
                                className="border-4 border-themeColor rounded-lg h-10 p-2 w-full h-20"
                                {...register("intro")}
                                defaultValue={m_clubData?.content.intro}>
                            </textarea>
                        </div>


                        {/* 聯係方式 */}
                        <div>
                            <SecondTitle>聯絡方式</SecondTitle>
                            <ul>
                                {
                                    m_clubData?.content.contact.map((item, index) => item.num != void 0 && (
                                        <div key={index}>
                                            <div className="flex flex-row gap-5 items-center mb-5">
                                                {/*方式：如email */}
                                                <input
                                                    className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                                    placeholder={"聯絡方式"}
                                                    // {...register()}
                                                    defaultValue={item.type} />

                                                {/*内容：如example@example.com */}
                                                <input
                                                    className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                                    placeholder={"内容"}
                                                    defaultValue={item.num} />

                                                {/* 刪除某個聯係方式*/}
                                                <MinusCircleIcon
                                                    className="w-10 h-10 text-alert hover:opacity-70 hover:cursor-pointer" />
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
                        </div>
                    </ContentBlock>

                    {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                    <ContentBlock title="相關圖片" condition={true}>

                        {/* 刪除圖片 */}
                        <div>
                            <SecondTitle>現有圖片</SecondTitle>
                            <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                                {/* 相關圖片 */}
                                {m_clubData?.content.club_photos_list.map((url, index) =>
                                    <img
                                        key={index}
                                        src={BASE_HOST + url}
                                        className={`w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer ${_del_club_photos && _del_club_photos.indexOf(url) != -1 && "opacity-70"}`}
                                        onClick={() => {

                                            if (!_del_club_photos) {
                                                setValue("del_club_photos", [url]);
                                                return;
                                            }

                                            // 圖片已經在列表中，將其移出列表
                                            if (_del_club_photos.indexOf(url) != -1) {
                                                let [del_club_photos, ...rest] = _del_club_photos;
                                                setValue("del_club_photos", rest);
                                                return;
                                            }

                                            // 圖片不在列表中，將其推入列表
                                            setValue("del_club_photos", [..._del_club_photos, url]);
                                        }} />
                                )}
                            </div>
                        </div>

                        {/* 新增圖片 */}
                        <div>
                            <SecondTitle>新增圖片</SecondTitle>
                            <ARKListImageInput
                                base={
                                    {
                                        regName: "add_club_photos",
                                        isRequired: false,
                                        mode: "object",
                                    }
                                }
                                register={register}
                                imgList={watch("add_club_photos")}
                                setValue={setValue}
                                thisErr={errors.add_club_photos?.message}
                            />
                        </div>
                    </ContentBlock>
                </ContentBlockGrid>

                {/* 上傳 */}
                <StdButton
                    textContent={'上傳'}
                    Icon={ArrowUpIcon} />
            </form>

            <StdButton
                onClickFunc={() => {
                    console.log("Intro: ", watch("intro"));
                    console.log("Contact: ", watch("contact"));
                    console.log("m_clubData: ", m_clubData);
                    console.log("add_club_photos:", watch("add_club_photos"));
                    console.log("del_club_photos: ", watch("del_club_photos"));
                }}
                textContent={'測試'}
                Icon={ArrowUpIcon}></StdButton>
        </ARKMain>
    )
}