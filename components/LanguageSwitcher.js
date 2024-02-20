import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("zh"); // 默认语言为中文

    // When mounted on client, now we can show the UI
    useEffect(() => setLanguage(i18n.language), [i18n.language]);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div>
            <button onClick={handleLanguageChange} value={"zh"} style={{ marginRight: "50px" }}>中</button>
            <button onClick={handleLanguageChange} value={"en"} style={{ marginRight: "50px" }}>EN</button>
            <button onClick={handleLanguageChange} value={"ja"} >日</button>

            {i18n.language === "zh" && (
                <div>
                    <h1>歡迎使用中英文轉換功能！</h1>
                    <p>這是一段中文文本。</p>
                </div>
            )}

            {i18n.language === "en" && (
                <div>
                    <h1>Welcome to the Language Switcher!</h1>
                    <p>This is an English text.</p>
                </div>
            )}

            {i18n.language === "ja" && (
                <div>
                    <h1>言語切り替えへようこそ！</h1>
                    <p>これは日本語のテキストです。</p>
                </div>
            )}
        </div>
    );


};

export default LanguageSwitcher;