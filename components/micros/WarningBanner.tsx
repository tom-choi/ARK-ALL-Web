import React, { useState, useRef } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';
import { useDisplayWarningBannerStore } from '../../states/state';

const WarningBanner = () => {
    const { t } = useTranslation();

    const { display, setDisplay } = useDisplayWarningBannerStore();

    return (

        process.env.NODE_ENV == 'development' && (
            <div
                className={`w-full flex flex-row justify-between items-center bg-alert px-3 py-2 ${display == "false" && "hidden"} transition-all`}>
                <p className="text-white">
                    <strong>{`${t("WARNING")}:`}</strong> {t("WRN_LOCAL_SERVER")}
                </p>
                <p>
                    <XCircleIcon
                        className={"block text-sm text-white w-5 h-5 hover:cursor-pointer hover:scale-105 transition-all"}
                        onClick={(e) => {
                            setDisplay("false");
                        }} />
                </p>
            </div>
        )

    );
}

export default WarningBanner;