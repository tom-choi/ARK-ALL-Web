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
            <div className="flex font-bold justify-between w-24">
                <button onClick={handleLanguageChange} value={"zh"}>
                    中
                </button>
                <button onClick={handleLanguageChange} value={"en"} >
                    EN
                </button>
                <button onClick={handleLanguageChange} value={"ja"} >
                    日
                </button>
            </div>

            {i18n.language === "zh" && (
                <div className="text-sm">
                    <h1>語言：中文</h1>
                </div>
            )}

            {i18n.language === "en" && (
                <div className="text-sm">
                    <h1>Languag: English</h1>
                </div>
            )}

            {i18n.language === "ja" && (
                <div className="text-sm">
                    <h1>言語：日本語</h1>
                </div>
            )}
        </div>
    );


};

export default LanguageSwitcher;