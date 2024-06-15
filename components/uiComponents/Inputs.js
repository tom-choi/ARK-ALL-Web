import { useRef, useState } from "react";
import { IF } from "./ContentBlock";

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
    let regName = props.regName;
    let thisErr = props.thisErr;
    let errText = props.errText;
    let register = props.register;

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