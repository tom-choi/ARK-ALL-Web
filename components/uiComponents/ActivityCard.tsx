import React from "react";
import { MouseEvent } from "react";
import { ActivityBase } from "../../types/index.d";
import { parseTimeString } from "../../utils/functions/u_format";
import { BASE_HOST } from '../../utils/pathMap';


/**
 * 渲染活動卡片
 * @param {*} props
 * @prop {object} item Activity的對象，包含多個值 
 * @prop {int} index 卡片的序號 
 * @returns 
 */
export const ActivityCard = (props: { item: ActivityBase, index: number }) => {
    const { item, index } = props;

    /**
     * 用戶點擊卡片跳轉。
     * @param {event} event 事件
     * @param {object} activityData  活動數據 
     */
    const onClickActivityCard = (event: MouseEvent<HTMLDivElement>, activityData: object) => {
        localStorage.setItem("CurActivity", JSON.stringify(activityData));
        window.location.href = "activityDetail";
    }

    return (
        <div
            key={index}
            className="bg-themeColorUltraLight dark:bg-gray-800 flex flex-col p-3 rounded-lg mx-auto hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
            onClick={(event: MouseEvent<HTMLDivElement>) => onClickActivityCard(event, item)}>

            <div className="flex flex-col lg:w-48 xl:w-64 md:w-48 sm:w-64 items-center">
                {/*活動封面*/}
                <img src={BASE_HOST + item.cover_image_url} alt="club_photos" className=" hover:cursor-pointer md:w-48 h-64 object-cover sm:max-w-64 rounded-lg mb-5 shadow-lg" style={{ backgroundColor: '#fff' }} />

                {/*活動描述*/}
                <div className="flex flex-col h-16 mb-3 mx-auto">
                    <h3 className="text-themeColor text-xl text-center font-bold text-ellipsis overflow-hidden">
                        {item.title}
                    </h3>
                </div>
                <div className="flex flex-col  border-t-2 border-themeColorLight items-left font-bold text-themeColor opacity-80">
                    <p className="text-left">
                        🕐:
                        {' '}
                        {parseTimeString(item.enddatetime).Year}{'-'}
                        {parseTimeString(item.enddatetime).Month}{'-'}
                        {parseTimeString(item.enddatetime).Day}{' '}
                        {parseTimeString(item.enddatetime).Hour}{':'}
                        {parseTimeString(item.enddatetime).Minute}
                    </p>
                    <p className="text-left">
                        🚩：{item.location}
                    </p>
                </div>
            </div>
        </div>
    );
}
