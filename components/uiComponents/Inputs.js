import { useRef, useState } from "react";

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
 * 
 * @param {*} props 
 * @prop {placeholder:string, type:string} base - A base object containing the placeholder and type.
 * @prop {string} regName - The registration name of the input.
 * @prop {function} register - The register function from react-hook-form.
 * @returns 
 */
export const ARKTextInput = (props) => {
    // 表單屬性
    let { placeholder, type } = props.base;
    let regName = props.regName;
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
                {...register(regName)}

                onFocus={() => {
                    setBorderStyle(TextInputStyles.border.focused);
                    setLabelStyle(TextInputStyles.label.focused);
                }}
                onBlur={() => {
                    setBorderStyle(TextInputStyles.border.blurred);
                    setLabelStyle(TextInputStyles.label.blurred);
                }}>
            </input>
        </div>
    );
}