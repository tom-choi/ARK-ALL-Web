import { ReactNode, useRef, useState } from "react";
import { IF } from "./ContentBlock";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { duplicateFile } from "../../utils/functions/u_format";
import React from "react";

const TextInputStyles = {
    border: {
        focused: "border-opacity-100",
        blurred: "border-opacity-50"
    },
    label: {
        focused: "text-md opacity-100",
        blurred: "text-sm opacity-80"
    }
}


/**
 * 基於reac-hook-form封裝的ARK標準表單輸入框，在登錄認證時使用。
 * @param {*} props 
 * @prop {placeholder:string, type:string, isRequired:bool} base - 基礎表單屬性
 * @prop {string} regName - 注冊名，用於辨識表單中不同的輸入框。
 * @prop {FieldErrors<T>} thisErr - useForm中的formstate中的errors項。使用時需要細化至regName。
 * @prop {string} errText - 儅輸入框内容未被正確填寫時的提示詞。
 * @prop {UseFormRegister<T>} register - react-hook-form提供的register函數，將regName注冊到表單中。
 * @example
*   <ARKTextInput
        base={{ placeholder: t("CLUB_PWD"), type: "password", isRequired: true }}
        regName={"password"}
        thisErr={errors.password}
        errText={"請輸入密碼"}
        register={register}/>
 * @returns 
 */
export const ARKTextInput = (props: {
    base: {
        placeholder: string,
        type?: string,
        isRequired?: boolean
    },
    regName: string,
    thisErr: any,
    errText: string,
    register: any
}) => {
    // 表單屬性
    let { placeholder, type, isRequired } = props.base;
    let { regName, thisErr, errText, register } = props;

    // 樣式屬性
    let [m_borderStyle, setBorderStyle] = useState(TextInputStyles.border.blurred);
    let [m_labelStyle, setLabelStyle] = useState(TextInputStyles.label.blurred);

    let labelRef = useRef();

    return (
        <div>
            <p className={`text-themeColor font-bold ${m_labelStyle} transition-all`} ref={labelRef}>
                {placeholder}
            </p>
            <input
                className={`w-full border-2 border-themeColor ${m_borderStyle} outline-none rounded-lg h-10 p-2`}
                placeholder={placeholder}
                type={type || "text"}
                {...register(regName, { required: isRequired ? (errText || "未正確輸入") : false })}

                onFocus={() => {
                    setBorderStyle(TextInputStyles.border.focused);
                    setLabelStyle(TextInputStyles.label.focused);
                }}
                onBlur={() => {
                    setBorderStyle(TextInputStyles.border.blurred);
                    setLabelStyle(TextInputStyles.label.blurred);
                }}>
            </input>

            <IF condition={thisErr}>
                <p className={"text-alert text-sm font-bold"}>
                    {errText || "未正確輸入！"}
                </p>
            </IF>

        </div>
    );
}

/**
 * ARK帶標簽的表單。
 * @param {*} props
 * @prop {string} title - 表單的標簽，如“開始時間”， “結束時間”等
 * @prop {boolean} condition - 渲染條件。有些表單選項會根據條件顯示或隱藏。
 * @prop {ReactNode | ReactNode[]} - 子内容，通常為表單元素。
 * @example
 * <ARKLabeledInput
 *      title={"活動鏈接"}                           // 輸入框的標簽
 *      condition={watch("type") == "WEBSITE"}>     // 僅在表單選項type為WEBSITE的時候顯示
 *      <input                                      // 在使用該組件的頁面中的子項目，是一個input 元素，以填寫鏈接爲例子。
 *          type={"text"}
 *          {...register("link", {required: watch("type") == "WEBSITE" ? ("需要提供活動鏈接哦！"):false})}/>
 * </ARKLabeledInput>
 * @returns 
 */
export const ARKLabeledInput = (props: { title: string, condition?: boolean, children: ReactNode | ReactNode[] }) => {
    const { title, condition } = props;
    return (
        <IF condition={condition || condition == void 0}>
            <div className={`flex flex-row max-[420px]:flex-col items-center mb-3 gap-3 `}>
                <span className={`text-themeColor font-bold mr-5 max-[420px]:mr-0`}>
                    {props.title || "項目"}
                </span>
                <div className={`flex flex-row items-center gap-3  max-[512px]:w-[70%]`}>
                    {props.children}
                </div>
            </div>
        </IF>
    );
}


/**
 * 基於react-hook-form封裝的ARK標準圖片輸入組件。
 * @param props 
 * @prop {string}  base.regName - 註冊名，用於辨識表單中不同的輸入框。
 * @prop {boolean} base.isRequired - 是否為必須。不填默認為否。
 * @prop {string} base.initialURL - 初始圖片URL，即該組件未添加圖片的初始圖片。
 * @prop {UseFormRegister<T>} register - useForm的register函數，將輸入框綁定至表單。
 * @prop {UseFormSetValue<T>} setValue - useForm的setValue函數，手動將表單中的某項設定為某個值。
 * @example
 * setValue("cover_image_file", "https://example.com/image.jpg") // 將cover_image_file這一值設定為"https://example.dom/image.jpg"。
 * @prop {string} errText - 儅輸入框内容未被正確填寫時的提示詞。
 * @prop {FieldErrors<T>} thisErr - useForm中的formstate中的errors項。使用時需要細化至regName。
 * @example thisErr的用法
 * <ARKImageInput
 *      // 其他參數
 *      thisErr={errors.cover_image_file}/>
 * @returns 
 */
export const ARKImageInput = (props: {
    base: {
        regName: string,
        isRequired?: boolean,
        initialImgURL?: string
    },
    register: any,
    setValue: any,
    errText: string,
    thisErr: any
}) => {
    const { regName, isRequired, initialImgURL } = props.base;
    const { register, setValue, errText, thisErr } = props;

    const [m_imageURL, setImageURL] = useState(void 0);
    const [m_iconDisplay, setIconDisplay] = useState(true);
    const imageInputRef = React.createRef<HTMLInputElement>();

    return (
        <div
            className="flex flex-col w-96 h-96 max-[512px]:w-64 max-[512px]:h-64 items-center justify-center mx-auto bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 hover:scale-[1.02] transition-all"
            style={{
                backgroundImage: `url(${m_imageURL || initialImgURL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            onClick={() => imageInputRef.current.click()}>

            {/* Icon 部分 */}
            <IF condition={m_iconDisplay && !initialImgURL}>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-2">
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-themeColor">封面圖片</h3>
                    </div>
                </div>
            </IF>

            {/* 輸入邏輯部分 */}
            <input
                type={"file"}
                accept={"image/*"}
                className={"hidden"}
                {...register(regName, { required: isRequired ? (errText || "需要圖片") : false })}
                ref={imageInputRef}
                onChange={(e) => {
                    let fileObj = e.target.files[0];
                    if (!fileObj) {
                        return;
                    }
                    setIconDisplay(false);
                    setImageURL(URL.createObjectURL(fileObj));
                    setValue(regName, fileObj);
                }} />
        </div>
    );
}




/**
 * 基於react-hook-form封裝的ARK標準圖片**列表**輸入組件。
 * @param {*} props 
 * @prop {string} base.regName - 注冊名，用於辨識表單中不同的輸入框。
 * @prop {boolean} base.isRequired - 是否爲必須，不填默認爲否。
 * @prop {number} base.numLimit - 文件數量限制。
 * @prop {"array" | "object"} base.mode - 輸入模式，可以將項目推入對象(object)，也可將項目推入數組(Array)。
 * @prop {UseFormRegister<T>} register - useForm提供的register函數，將regName注冊到表單中。
 * @prop {*} imgList - 圖片列表，可以是對象(object)或數組(Array)，是所在表單中的監聽值，使用watch傳入。
 * @example
 * <ARKListImageInput
 *      base={{ regName: "add_relate_image", isRequired: false, numLimit: 5 }}
 *      // 其他參數
 *      imgList={watch("add_relate_image")}/>   // 此處watch為useForm中定義的函數，用於監聽表單的數值。其中"add_relate_image"應當與regName一致。
 * @prop {UseFormSetValue<T>} setValue - react-hook-form提供的setValue函數，將值寫入表單中。
 * @prop {string} errText - 輸入錯誤時的提示文字。
 * @prop {FieldErrors<T>} thisErr -  儅輸入框内容未被正確填寫時的提示詞。
 * @returns 
 */
export const ARKListImageInput = (props: {
    base: {
        regName: string,
        isRequired?: boolean,
        numLimit?: number
        mode?: "array" | "object"
    }
    register: any,
    imgList: any,
    setValue: any,
    errText?: string,
    thisErr: any
}) => {
    const { regName, isRequired, numLimit = 4, mode = "object" } = props.base;
    const { register, imgList, setValue, errText, thisErr } = props;

    const imageInputRef = React.createRef<HTMLInputElement>();
    const [m_hovering, setHovering] = useState("");

    /** 向JSON格式的Object列表中添加元素 */
    const AddToObjList = (e: React.ChangeEvent<HTMLInputElement>, regName: string, imgList: File[], numLimit: number, setValue: any) => {
        // 獲取新增的文件列表
        let fileObjArr = e.target.files;

        // 檢查數量是否符合要求
        let fileObjArrLen = fileObjArr.length;                          // Array
        let imgListLen = imgList ? Object.keys(imgList).length : 0;   // Object List
        if (fileObjArrLen > numLimit || fileObjArrLen + imgListLen > numLimit) {
            alert(errText || `圖片不能超過${numLimit}張！`);
            return;
        }

        // 將原有圖片轉換成數組（如果不為空）
        let arr = [];
        imgList && Object.keys(imgList).map(key => { arr.push(imgList[key]); });

        // 將傳入文件列表中的所有文件複製一份，並推入數組
        Object.entries(fileObjArr).map(([key, value]) => {
            let newFile = duplicateFile(value);
            arr.push(newFile);
        })

        // 把新數組解析成對象
        const filesAsObj = Object.fromEntries(
            Array.from(arr, (file, index) => [index, file])
        );

        setValue(regName, filesAsObj);
    }

    /** 向數組中添加元素 */
    const AddToArrayList = (e: React.ChangeEvent<HTMLInputElement>, regName: string, imgList: File[], numLimit: number, setValue: any) => {
        let fileObjArr = e.target.files;

        let fileArrLen = fileObjArr.length;
        let imgListLen = imgList ? imgList.length : 0;
        if (fileArrLen > numLimit || fileArrLen + imgListLen > numLimit) {
            alert(`圖片不能超過${numLimit}張`);
            return;
        }

        if (!imgList) {
            setValue(regName, fileObjArr);
            return;
        }

        if (imgList.length > 1) {
            setValue(regName, [...imgList, ...Array.from(fileObjArr)]);
        } else {
            setValue(regName, [imgList[0], ...Array.from(fileObjArr)]);
        }

    }


    return (
        <div className={"flex flex-row items-center justify-left max-[640px]:justify-center"}>
            <div className={`grid grid-cols-4 gap-4 max-[770px]:grid-cols-3 max-[638px]:grid-cols-2 object-cover w-full`}>
                {imgList && Object.entries(imgList).map(([key, value]) => (
                    <div className={"relative"} key={key}>
                        <div
                            className={`absolute -top-12 left-[2rem] opacity-${m_hovering != key ? "0" : "100"} transition-all bg-white drop-shadow-lg border border-[2.5px] border-themeColorLight rounded-full px-2 py-1`}>
                            點擊以刪除
                        </div>
                        <img
                            src={URL.createObjectURL(value as File)}
                            className={"mx-auto w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer"}
                            onMouseOver={(e) => { setHovering(key); }}
                            onMouseLeave={(e) => { setHovering(""); }}
                            onClick={(e) => {
                                let imgList_ = Object.fromEntries(
                                    Object.entries(imgList).filter(([k, v]) => k != key)
                                );
                                setValue(regName, imgList_);
                            }} />
                    </div>
                ))}

                <div
                    className="flex flex-col w-full h-24 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 hover:scale-[1.02] transition-all"
                    onClick={() => imageInputRef.current.click()}>

                    {/* Icon 部分 */}
                    <div className="flex items-center justify-center mb-2">
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                    </div>

                    {/* 輸入邏輯部分 */}
                    <input
                        type={"file"}
                        accept={"image/*"}
                        multiple
                        className={"hidden"}
                        {...register(regName, { required: isRequired ? (errText || "需要圖片") : false })}
                        ref={imageInputRef}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            switch (mode) {
                                case "object":
                                    console.log("Using Object Mode.");
                                    AddToObjList(e, regName, imgList, numLimit, setValue);
                                    break;
                                case "array":
                                    console.log("Using Array Mode.");
                                    AddToArrayList(e, regName, imgList, numLimit, setValue);
                                    break;
                            }
                            return;

                            // 獲取新增的文件列表
                            let fileObjArr = e.target.files;

                            // 檢查數量是否符合要求
                            let fileObjArrLen = fileObjArr.length;                          // Array
                            let imgListLen = imgList ? Object.keys(imgList).length : 0;   // Object List
                            if (fileObjArrLen > numLimit || fileObjArrLen + imgListLen > numLimit) {
                                alert(`圖片不能超過${numLimit}張！`);
                                return;
                            }

                            // 將原有圖片轉換成數組（如果不為空）
                            let arr = [];
                            imgList && Object.keys(imgList).map(key => { arr.push(imgList[key]); });

                            // 將傳入文件列表中的所有文件複製一份，並推入數組
                            Object.entries(fileObjArr).map(([key, value]) => {
                                let newFile = duplicateFile(value);
                                arr.push(newFile);
                            })

                            // 把新數組解析成對象
                            const filesAsObj = Object.fromEntries(
                                Array.from(arr, (file, index) => [index, file])
                            );

                            setValue(regName, filesAsObj);
                        }} />
                </div>
            </div>
        </div>
    );
}

