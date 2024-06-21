import React, { useState, useRef } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";

const WarningBanner = () => {

    const [m_opacity, setOpacity] = useState("100");

    return (

        process.env.NODE_ENV == 'development' && (
            <div
                className={`w-full flex flex-row justify-between items-center bg-alert px-3 py-2 opacity-${m_opacity} transition-all`}>
                <p className="text-white">
                    <strong>警告:</strong> 您現在使用的是本地服務器。
                </p>
                <p>
                    <XCircleIcon className={"block text-sm text-white w-5 h-5 hover:cursor-pointer hover:scale-105 transition-all"} onClick={() => {
                        setOpacity("0");
                    }} />
                </p>
            </div>
        )

    );
}

export default WarningBanner;