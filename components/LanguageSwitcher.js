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

        <div className="flex font-bold justify-between items-center w-24">
            <button onClick={handleLanguageChange} value={"zh"} className={`transition-all hover:text-themeColor hover:scale-[1.02] ${curLang === "zh" ? "text-themeColor scale-[1.02]" : "text-[#000000aa]"}`}>
                中
            </button>
            <button onClick={handleLanguageChange} value={"en"} className={`transition-all hover:text-themeColor hover:scale-[1.02] ${curLang === "en" ? "text-themeColor scale-[1.02]" : "text-[#000000aa]"}`}>
                EN
            </button>
            <button onClick={handleLanguageChange} value={"ja"} className={`transition-all hover:text-themeColor hover:scale-[1.02] ${curLang === "ja" ? "text-themeColor scale-[1.02]" : "text-[#000000aa]"}`}>
                日
            </button>
        </div>

    );


};

export default LanguageSwitcher;