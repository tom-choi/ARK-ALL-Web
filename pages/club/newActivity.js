// 包引用
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    TrashIcon,
    FolderArrowDownIcon,
    PlusCircleIcon,
    ArrowUpIcon
} from "@heroicons/react/24/solid";
import moment from 'moment/moment';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import NavBarSecondary from '../../components/navBarSecondary';
import { u_handleFileChange } from '../../utils/functions/u_fileHandle';
import { upload } from '../../lib/serverActions';
import { squashDateTime } from '../../utils/functions/u_format';
import { ListImage, ListImageAdd } from '../../components/uiComponents/ListImage';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { useForm, useFormState } from 'react-hook-form';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { ARKImageInput, ARKLabeledInput } from '../../components/uiComponents/Inputs';
import { createActivity } from '../../lib/serverActions';

// 活動類型映射
const activityTypeMap = {
    ACTIVITY: "普通活動",
    OFFICIAL: "澳大官方",
    WEBSITE: "網頁"
};

const inputStyle = "border-4 border-themeColor rounded-lg h-15 p-2 ontline-none";
const textareaStyle = "text-lg block w-full h-80 border-4 border-themeColor rounded-lg p-2 resize-none min-h-32 outline-none";


const _metaTest = async (data) => {
    const { sDate, sTime, eDate, eTime, ...restData } = data;
    let startdatetime = squashDateTime(data.sDate, data.sTime, "T");
    let enddatetime = squashDateTime(data.eDate, data.eTime, "T");

    let newData = { startdatetime: startdatetime, enddatetime: enddatetime, can_follow: true, ...restData };
    let fd = new FormData();
    for (var key in newData) {
        fd.append(key, newData[key]);
    }
    await upload(fd, BASE_URI + POST.EVENT_CREATE, 'createdActivityInfo', '../club/clubInfo', true, true);
    console.log(newData);
}

const NewActivity = () => {
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
        defaultValues: {
            title: "",
            cover_image_file: "",
            sDate: moment(new Date()).format("YYYY-MM-DD"),
            sTime: moment(new Date()).format("HH:MM"),
            eDate: moment(new Date()).format("YYYY-MM-DD"),
            eTime: moment(new Date()).format("HH:MM"),
            location: "",
            link: "",
            type: "ACTIVITY",
            introduction: "",
            add_relate_image: []
        }
    });

    const selectedType = watch("type");

    return (
        <ARKMain title={"新活動"}>
            <NavBarSecondary returnLocation={'./clubInfo'} />
            <form className={`flex flex-col gap-5`} onSubmit={handleSubmit(createActivity)}>
                {/* 活動名稱 */}
                <input
                    className={`${inputStyle} text-3xl mx-auto`}
                    placeholder={"活動名稱"}
                    {...register("title", { required: "請輸入活動標題。" })} />

                {/* 封面圖片 */}
                <ARKImageInput
                    base={{ regName: "cover_image_file", isRequired: true }}
                    register={register}
                    setValue={setValue}
                    errText={"請輸入封面圖片"}
                    thisErr={errors.cover_image_file}
                />

                <ContentBlockGrid>

                    {/* 基本訊息 */}
                    <ContentBlock title={"基本訊息"}>
                        {/* 類型 */}
                        <ARKLabeledInput title={"類型"}>
                            <select
                                className={inputStyle}
                                {...register("type")}>
                                {Object.keys(activityTypeMap).map(key => (
                                    <option value={key}>{activityTypeMap[key]}</option>
                                ))}
                            </select>
                        </ARKLabeledInput>

                        {/* 開始時間 */}
                        <ARKLabeledInput title={"開始"} condition={selectedType == "ACTIVITY"}>
                            <input
                                className={inputStyle}
                                type={"date"}
                                {...register("sDate")} />
                            <input
                                className={inputStyle}
                                type={"time"}
                                {...register("sTime")} />
                        </ARKLabeledInput>

                        {/* 結束時間 */}
                        <ARKLabeledInput title={"結束"} condition={selectedType == "ACTIVITY"}>
                            <input
                                className={inputStyle}
                                type={"date"}
                                {...register("eDate")} />
                            <input
                                className={inputStyle}
                                type={"time"}
                                {...register("eTime")} />
                        </ARKLabeledInput>

                        {/* 地點 */}
                        <ARKLabeledInput title={"地點"} condition={selectedType == "ACTIVITY"}>
                            <input
                                className={inputStyle}
                                {...register("location")} />
                        </ARKLabeledInput>

                        {/* 鏈接 */}
                        <ARKLabeledInput title={"鏈接"} condition={selectedType == "WEBSITE"}>
                            <input
                                className={inputStyle}
                                type={"url"}
                                {...register("link")} />
                        </ARKLabeledInput>
                    </ContentBlock>

                    {/* 簡介 */}
                    <ContentBlock title={"簡介"}>
                        <textarea
                            className={textareaStyle}
                            placeholder={"請在此輸入社團簡介"}
                            {...register("introduction")} />
                    </ContentBlock>

                </ContentBlockGrid>

                <ContentBlock title={"相關圖片"}>
                    <input
                        type={"file"}
                        multiple
                        {...register("add_relate_image")} />
                </ContentBlock>

                <button
                    className={"w-32 px-10 py-2 rounded-full bg-themeColor hover:scale-[1.02] transition-all"}>
                    上傳
                </button>
            </form>
        </ARKMain>
    );
}

export default NewActivity;