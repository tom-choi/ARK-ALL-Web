// 包引用
import React from 'react';
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import moment from 'moment/moment';

// 本地引用
import NavBarSecondary from '../../components/navBarSecondary';
import { useForm } from 'react-hook-form';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { ARKImageInput, ARKLabeledInput, ARKListImageInput } from '../../components/uiComponents/Inputs';
import { createActivity } from '../../lib/serverActions';
import { StdButton } from '../../components/uiComponents/StdButton';

// 活動類型映射
const activityTypeMap = {
    ACTIVITY: "普通活動",
    WEBSITE: "網頁"
    // OFFICIAL: "澳大官方",
};

const inputStyle = "border-4 border-themeColor rounded-lg h-15 p-2 ontline-none";
const textareaStyle = "text-lg block w-full h-80 border-4 border-themeColor rounded-lg p-2 resize-none min-h-32 outline-none";

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
    const addedRelateImage = watch("add_relate_image");

    return (
        <ARKMain title={"新活動"}>
            <NavBarSecondary returnLocation={'./clubInfo'} />
            <form className={`flex flex-col gap-5`} onSubmit={handleSubmit(createActivity)}>
                {/* 活動名稱 */}
                <input
                    className={`${inputStyle} text-3xl mx-auto`}
                    placeholder={"活動名稱"}
                    {...register("title", { required: "請輸入活動標題" })} />
                <div className={"text-alert text-center mx-auto mb-3"}>{errors.title && errors.title.message}</div>

                {/* 封面圖片 */}
                <ARKImageInput
                    base={{ regName: "cover_image_file", isRequired: true }}
                    register={register}
                    setValue={setValue}
                    errText={"請輸入封面圖片"}
                    thisErr={errors.cover_image_file}
                />
                <div className={"text-alert text-center mx-auto mb-3"}>{errors.cover_image_file && errors.cover_image_file.message}</div>

                <ContentBlockGrid gridNum={selectedType == "WEBSITE" ? 1 : 2}>

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
                        <ARKLabeledInput title={"開始"}>
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
                        <ARKLabeledInput title={"結束"}>
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
                                {...register("location", { required: selectedType == "ACTIVITY" ? "請輸入地點" : false })} />
                            <div className={"text-alert"}>{errors.location && errors.location.message}</div>
                        </ARKLabeledInput>


                        {/* 鏈接 */}
                        <ARKLabeledInput title={"鏈接"} condition={selectedType == "WEBSITE"}>
                            <input
                                className={inputStyle}
                                type={"url"}
                                {...register("link", { required: selectedType == "WEBSITE" ? "需要提供活動鏈接哦！" : false })} />
                            <div className={"text-alert"}>{errors.link && errors.link.message}</div>
                        </ARKLabeledInput>
                    </ContentBlock>

                    {/* 簡介 */}
                    <ContentBlock title={"簡介"} condition={selectedType == "ACTIVITY"}>
                        <textarea
                            className={textareaStyle}
                            placeholder={"請在此輸入社團簡介"}
                            {...register("introduction", { required: selectedType == "ACTIVITY" ? "你需要向大家介紹活動的内容哦！" : false })} />
                        <div className={"text-alert"}>{errors.introduction && errors.introduction.message}</div>

                    </ContentBlock>

                </ContentBlockGrid>

                {/* 相關圖片 */}
                <ContentBlock title={"相關圖片"} condition={selectedType == "ACTIVITY"}>
                    <ARKListImageInput
                        base={{ regName: "add_relate_image", isRequired: false, numLimit: 5 }}
                        register={register}
                        imgList={watch("add_relate_image")}
                        setValue={setValue}
                        errText={"請輸入相關圖片"}
                        thisErr={errors.add_relate_image} />
                </ContentBlock>

                <StdButton textContent={"上傳"} Icon={ArrowUpIcon} />



            </form>
        </ARKMain>
    );
}

export default NewActivity;