import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import { u_handleFileChange } from '../../utils/functions/u_fileHandle';

import { useState } from 'react';

import {
    PencilSquareIcon,
    TrashIcon,
    FolderArrowDownIcon,
    PlusCircleIcon,
    ChevronLeftIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/solid";

/**
 * 
 * @param {*} props 
 * @prop {object | string} item 圖片文件對象或者圖片URL
 * @prop {*} index  圖片在列表中的索引
 * @prop {*} isEditMode 是否爲編輯模式
 * @prop {*} handleImageDelete 圖片刪除的函數
 * @returns 
 */
export const ListImage = (props) => {

    const { item, index, isEditMode, handleImageDelete } = props;

    let deleteBtnStyle = "absolute flex flex-col bg-black text-white text-xl p-3 rounded-lg text-center justify-center opacity-50 hover:cursor-pointer hover:opacity-100 hover:bg-alert";
    let [imgStyle, setImgStyle] = useState("rounded-lg border-themeColor border-4 w-full h-full");

    return (
        <div key={index} className="flex mb-4 items-center justify-center" >
            <img src={
                typeof item == 'object' ? URL.createObjectURL(item) : BASE_HOST + item
            } className={imgStyle} />

            {/* 刪除按鈕 */}
            {isEditMode && (
                <div className={deleteBtnStyle} onClick={(e) => {
                    handleImageDelete(e, index);
                    setImgStyle(imgStyle + " opacity-50");
                }}>
                    <p>刪除</p>
                </div>
            )}
        </div>
    );
}

/**
 * 
 * @param {*} props 
 * @prop {ref} relateImageInputRef 引用圖片輸入input框
 * @prop {array<object | string>} imageList 圖片列表
 * @prop {function} setImageList 圖片列表更改函數
 * @prop {int} fileNumLimit 文件數量限制
 * @returns 
 */
export const ListImageAdd = (props) => {

    const { relateImageInputRef, imageList, setImageList, fileNumLimit } = props;

    let cssStyle = "flex flex-col items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 mb-4";

    return (
        <div className={cssStyle}
            onClick={event => relateImageInputRef.current.click()}>
            <PlusCircleIcon className="w-10 h-10 text-themeColor" />
            <input
                type="file"
                accept="image/*"
                multiple
                ref={relateImageInputRef}
                onChange={event => u_handleFileChange(event, imageList, setImageList, false, false, fileNumLimit)}
                className="flex w-full h-full hidden"
            />
        </div>
    );
}