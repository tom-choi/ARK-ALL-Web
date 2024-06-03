import { customSettings } from "../utils/settings";
import {
    PencilSquareIcon,
    PlusIcon,
    PlusCircleIcon,
    ChevronLeftIcon
} from "@heroicons/react/24/solid";
import ThemeChanger from './DarkSwitch';
import LanguageSwitcher from "./LanguageSwitcher";

const NavBarSecondary = (props) => {

    const returnStr = props.returnStr ? props.returnStr : "主頁";

    const returnToPrevious = () => {
        if (props.clearLocStorage) localStorage.clear();
        window.location.href = props.returnLocation;
    }

    return (
        <div className="w-full mb-5">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center  text-themeColor text-xl font-bold">
                    <div className="flex flex-col justify-center">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </div>
                    <div
                        className=" hover:cursor-pointer hover:opacity-50"
                        onClick={returnToPrevious}>
                        返回{returnStr}
                    </div>
                </div>
                <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                    <ThemeChanger />
                    <LanguageSwitcher />
                </div>
            </div>
            {customSettings.is_local_test && (
                <div className="bg-alert pl-3 py-2 text-white">
                    <p><strong>警告:</strong> 您現在使用的是本地服務器。</p>
                </div>
            )}
        </div>
    );
}

export default NavBarSecondary;
// {/* 頂欄*/ }
// <div className="w-full mb-5">
//     {/* 選項*/}
//     <div className="flex justify-between items-center mb-10">
//         <div className="flex items-center  text-themeColor text-xl font-bold">
//             <div className="flex flex-col justify-center">
//                 <ChevronLeftIcon className="w-5 h-5" />
//             </div>
//             <div
//                 className=" hover:cursor-pointer hover:opacity-50"
//                 onClick={returnToMain}>
//                 返回主頁
//             </div>
//         </div>
//         <div className="hidden mr-3 space-x-4 lg:flex nav__item">
//             <ThemeChanger />
//             <LanguageSwitcher />
//         </div>
//     </div>
//     {/* 本地測試警告 */}
//     {customSettings.is_local_test && (
//         <div className="bg-alert pl-3 py-2">
//             <p><strong>警告:</strong> 您現在使用的是本地服務器。</p>
//         </div>
//     )}
// </div>