// 包引用
import React, { useState, useEffect, useRef } from 'react';
import {
    PencilSquareIcon,
    TrashIcon,
    FolderArrowDownIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/solid";
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import Footer from "../../components/footer";
import { editActivity, upload } from "../../lib/serverActions";
import { u_handleFileChange, u_handleFileDelete } from '../../utils/functions/u_fileHandle';
import { parseDateTime, squashDateTime } from '../../utils/functions/u_format';
import NavBarSecondary from '../../components/navBarSecondary';
import { ListImage, ListImageAdd } from '../../components/uiComponents/ListImage';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKMain, ContentBlock, ContentBlockGrid, IF, IFELSE } from '../../components/uiComponents/ContentBlock';
import { data } from 'autoprefixer';
import { customSettings } from '../../utils/settings';
import { FirstTitle, SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IEditActivityLocal, IEditActivityUpload, IGetAvtivityById } from '../../types/index.d';
import { authGuard } from '../../lib/authentication';
import { appendListToFormData, deleteActivity, getActivityById } from '../../lib/serverActions';
import { ARKImageInput, ARKLabeledInput, ARKListImageInput } from '../../components/uiComponents/Inputs';


// 活動類型映射
const activityTypeMap = {
    "ACTIVITY": "普通活動",
    "OFFICIAL": "澳大官方",
    "WEBSITE": "網頁"
};

let del_relate_image = [];
let del_relate_image_index = [];


const ActivityDetail = () => {

    const [m_clubNum, setClubNum] = useState<string>("");
    const [m_activityData, setActivityData] = useState<IGetAvtivityById>(null);     // 活動數據
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<IEditActivityLocal>();

    // 獲取活動數據
    useEffect(() => {
        const clubNum = authGuard({ urlParamName: "club_num" });
        setClubNum(clubNum);

        const activityID = qs.parse(window.location.search, { ignoreQueryPrefix: true })['activity_id'];
        console.log(activityID);
        getActivityById(activityID, setActivityData).then(() => { setIsLoading(false) });
    }, []);

    // 將默認值填充表單
    useEffect(() => {
        if (!m_activityData) {
            return;
        }

        let {
            _id,
            relate_image_url,
            club_name,
            created_by,
            startdatetime,
            enddatetime,
            timestamp,
            state,
            ..._base } = m_activityData?.content;

        let startdatetime_ = parseDateTime(startdatetime);
        let enddatetime_ = parseDateTime(enddatetime);

        let base = {
            ..._base,
            id: m_activityData?.content._id,
            add_relate_image: [],
            del_relate_image: [],
            sDate: startdatetime_.date,
            sTime: startdatetime_.time,
            eDate: enddatetime_.date,
            eTime: enddatetime_.time
        }
        reset(base);
    }, [m_activityData]);

    const [isEditMode, setEditMode] = useState(false);          // 是否為編輯模式


    // 相關圖片
    const [m_relatedImages, setRelatedImages] = useState(null);     // 暫存活動圖片


    const onSubmit: SubmitHandler<IEditActivityLocal> = async (_data: IEditActivityLocal) => {
        try {
            return editActivity(_data, m_clubNum);
        } catch (err) {
            alert("上傳編輯失敗，請檢查網絡，或重試。");
            return null;
        }
    }

    return (
        <ARKMain title={`${m_activityData?.content.title}- 詳情`}>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation={`./clubInfo?club_num=${m_clubNum}`} returnStr={'社團訊息'}></NavBarSecondary>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AfterLoading isLoading={isLoading}>

                    {/* 社團名字+活動標題*/}
                    <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                        <IFELSE condition={!isEditMode}>
                            <h1 className="text-3xl">
                                {m_activityData?.content.title}
                            </h1>
                            <input
                                placeholder={"活動名稱"}
                                className="text-3xl border-4 border-themeColor rounded-lg h-10 p-2"
                                {...register("title")} />
                        </IFELSE>

                        {/* 社團名字 */}
                        <h3 className="text-xl mb-3">
                            {'By ' + (m_activityData?.content.club_name)}
                        </h3>
                    </div>

                    {/* 封面圖片 */}
                    <ARKImageInput
                        base={{
                            regName: "cover_image_file",
                            initialImgURL: BASE_HOST + m_activityData?.content.cover_image_url,
                        }}
                        register={register}
                        setValue={setValue}
                        errText={errors.cover_image_file?.message}
                        thisErr={errors.cover_image_file} />

                    {/*操作陣列*/}
                    <StdButtonGrid>
                        {/* 編輯按鈕*/}
                        <StdButton
                            color="bg-themeColor"
                            onClickFunc={() => { setEditMode(!isEditMode); }}
                            textContent={isEditMode ? '取消編輯' : '編輯'}
                            Icon={PencilSquareIcon}
                            type={"button"} />

                        {/* 刪除活動按鈕*/}
                        <StdButton
                            color="bg-alert"
                            onClickFunc={() => { deleteActivity(m_activityData?.content._id, m_clubNum, '確定刪除活動?'); }}
                            textContent={'刪除活動'}
                            Icon={TrashIcon}
                            condition={isEditMode}
                            type={"button"} />
                    </StdButtonGrid>

                    {/* 時間和介紹 */}
                    <ContentBlockGrid
                        gridNum={(!m_activityData || m_activityData?.content.type != 'WEBSITE') ? 2 : 1}>
                        {/*開始和結束時間*/}
                        <ContentBlock title="基本訊息">

                            {/* 開始時間和結束時間*/}
                            <ARKLabeledInput title={"開始"}>
                                <IFELSE condition={!isEditMode}>
                                    <p>{m_activityData && moment(m_activityData.content.startdatetime).format("YYYY-MM-DD HH:mm")}</p>
                                    <div className={"flex flex-row gap-2"}>
                                        <input
                                            type={"date"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("sDate")}
                                        />
                                        <input
                                            type={"time"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("sTime")}
                                        />
                                    </div>
                                </IFELSE>
                            </ARKLabeledInput>
                            <ARKLabeledInput title={"結束"}>
                                <IFELSE condition={!isEditMode}>
                                    <p>{m_activityData && moment(m_activityData.content.enddatetime).format("YYYY-MM-DD HH:mm")}</p>
                                    <div className={"flex flex-row gap-2"}>
                                        <input
                                            type={"date"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("eDate")}
                                        />
                                        <input
                                            type={"time"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("eTime")}
                                        />
                                    </div>
                                </IFELSE>
                            </ARKLabeledInput>

                            {/* 地點或鏈接 */}
                            <IFELSE condition={m_activityData?.content.type != 'WEBSITE'}>
                                {/*非網頁 - 顯示地點 */}
                                <ARKLabeledInput title={"地點"}>
                                    <IFELSE condition={!isEditMode}>
                                        {m_activityData?.content.location}
                                        <input
                                            placeholder={"地點"}
                                            className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                            {...register("location")} />
                                    </IFELSE>
                                </ARKLabeledInput>

                                {/*網頁 - 顯示鏈接 */}
                                <ARKLabeledInput title={"鏈接"}>
                                    <IFELSE condition={!isEditMode}>
                                        {(m_activityData && (
                                            <a href={m_activityData.content.link} target="_blank">
                                                {m_activityData.content.link}
                                            </a>
                                        ))}
                                        <input
                                            placeholder={"鏈接"}
                                            className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                            {...register("link")} />
                                    </IFELSE>
                                </ARKLabeledInput>
                            </IFELSE>
                        </ContentBlock>

                        {/*活動介紹*/}
                        <ContentBlock
                            title="簡介"
                            condition={!m_activityData || m_activityData.content.type != 'WEBSITE'}>
                            <IFELSE condition={!isEditMode}>
                                <p className="text-ellipsis overflow-hidden">
                                    {m_activityData && m_activityData?.content.introduction}
                                </p>
                                <textarea
                                    placeholder={"簡介"}
                                    className="text-lg block w-full border-4 border-themeColor rounded-lg p-2 resize-none min-h-32"
                                    rows={10}
                                    {...register("introduction")} />
                            </IFELSE>
                        </ContentBlock>
                    </ContentBlockGrid>

                    {/* TODO: Link類型 */}

                    {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                    <ContentBlock
                        title="相關圖片"
                        condition={m_activityData && (m_activityData.content.relate_image_url.length > 0 || isEditMode)}
                        className={`mt-5`}>
                        {/* 刪除圖片 */}
                        <div>
                            {isEditMode && (<SecondTitle>現有圖片</SecondTitle>)}
                            <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                                {/* 相關圖片 */}
                                {m_activityData?.content.relate_image_url.map((url, index) =>
                                    <img
                                        key={index}
                                        src={BASE_HOST + url}
                                        className={`w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer ${watch("del_relate_image") && watch("del_relate_image").indexOf(url) != -1 && "opacity-70"}`}
                                        onClick={() => {
                                            if (!isEditMode) return;

                                            if (!watch("del_relate_image")) {
                                                setValue("del_relate_image", [url]);
                                                return;
                                            }

                                            // 圖片已經在列表中，將其移出列表
                                            if (watch("del_relate_image").indexOf(url) != -1) {
                                                let [url, ...rest] = watch("del_relate_image");
                                                setValue("del_relate_image", rest);
                                                return;
                                            }

                                            // 圖片不在列表中，將其推入列表
                                            setValue("del_relate_image", [...watch("del_relate_image"), url]);
                                        }} />
                                )}
                            </div>
                        </div>

                        {/* 新增圖片 */}
                        <IF condition={isEditMode}>
                            <SecondTitle>新增圖片</SecondTitle>
                            <ARKListImageInput
                                base={
                                    {
                                        regName: "add_relate_image",
                                        isRequired: false,
                                        mode: "object",
                                        numLimit: 5 - m_activityData?.content.relate_image_url.length + (watch("del_relate_image") ? watch("del_relate_image").length : 0),
                                    }
                                }
                                register={register}
                                imgList={watch("add_relate_image")}
                                setValue={setValue}
                                errText={"圖片總數不能超過5張！"}
                                thisErr={errors.add_relate_image?.message}
                            />
                        </IF>
                    </ContentBlock>


                    {/*操作陣列*/}
                    <StdButtonGrid condition={isEditMode}>
                        {/* 上傳*/}
                        <StdButton type={"submit"} textContent={'上傳編輯'} Icon={ArrowUpIcon} />
                    </StdButtonGrid>

                    <Footer />
                </AfterLoading>
            </form>

        </ARKMain>



    );
}

export default ActivityDetail;