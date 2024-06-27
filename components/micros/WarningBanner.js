import React, { useState, useRef } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';

const WarningBanner = () => {
    const { t } = useTranslation();

    const [m_opacity, setOpacity] = useState("");

    return (

        process.env.NODE_ENV == 'development' && (
            <div
                className={`w-full flex flex-row justify-between items-center bg-alert px-3 py-2 ${m_opacity} transition-all`}>
                <p className="text-white">
                    <strong>{`${t("WARNING")}:`}</strong> {t("WRN_LOCAL_SERVER")}
                </p>
                <p>
                    <XCircleIcon className={"block text-sm text-white w-5 h-5 hover:cursor-pointer hover:scale-105 transition-all"} onClick={() => {
                        setOpacity("hidden");
                    }} />
                </p>
            </div>
        )

    );
}

export default WarningBanner;