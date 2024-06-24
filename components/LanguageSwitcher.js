import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../states/state";


const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    // 全局語言狀態
    const curLang = useLangStore((state) => state.curLang);
    const setCurLangStore = useLangStore((state) => state.setLang);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;

        // 設定當前語言，並固定狀態
        setCurLangStore(selectedLanguage);
        i18n.changeLanguage(curLang);
    };

    return (
        <div>
            <div className="flex font-bold justify-between items-center w-24">
                <button onClick={handleLanguageChange} value={"zh"} className="hover:text-themeColor">
                    中
                </button>
                <button onClick={handleLanguageChange} value={"en"} className="hover:text-themeColor" >
                    EN
                </button>
                <button onClick={handleLanguageChange} value={"ja"} className="hover:text-themeColor">
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
                    <h1>Language: English</h1>
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