import { useRef, useState } from "react";
import { IF } from "./ContentBlock";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

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
 * 基於reac-hook-form封裝的ARK標準表單輸入框。
 * @param {*} props 
 * @prop {placeholder:string, type:string, isRequired:bool} base - 基礎表單屬性
 * @prop {string} regName - 注冊名，用於辨識表單中不同的輸入框。
 * @prop {*} thisErr - 由UseFormState提供的errors項。
 * @prop {function} register - react-hook-form提供的register函數，將regName注冊到表單中。
 * @example
*   <ARKTextInput
        base={{ placeholder: t("CLUB_PWD"), type: "password", isRequired: true }}
        regName={"password"}
        thisErr={errors.password}
        errText={"請輸入密碼"}
        register={register}
    />
 * @returns 
 */
export const ARKTextInput = (props) => {
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
                className={`border-2 border-themeColor ${m_borderStyle} outline-none rounded-lg h-10 p-2`}
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
 * 
 * @param {*} props 
 * @returns 
 */
export const ARKLabeledInput = (props) => {
    const { title, condition } = props;
    return (
        <IF condition={condition || condition == void 0}>
            <div className="flex items-center mb-3 gap-3">
                <span className="text-themeColor font-bold mr-5">
                    {props.title || "項目"}
                </span>
                {props.children}
            </div>
        </IF>
    );
}


export const ARKImageInput = (props) => {
    const { regName, isRequired } = props.base;
    const { register, setValue, errText, thisErr } = props;

    const [m_imageURL, setImageURL] = useState(void 0);
    const [m_iconDisplay, setIconDisplay] = useState(true);
    const imageInputRef = useRef();

    return (
        <div
            className="flex flex-col w-96 h-96 items-center justify-center mx-auto bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 hover:scale-[1.02] transition-all"
            style={{
                backgroundImage: `url(${m_imageURL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            onClick={() => imageInputRef.current.click()}>

            {/* Icon 部分 */}
            <IF condition={m_iconDisplay}>
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