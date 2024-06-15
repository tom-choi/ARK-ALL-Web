// 包引用
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

// 本地引用
import Container from '../components/container';
import Navbar from '../components/navbar';
import { clubSignIn } from '/lib/authentication';
import { ARKTextInput, TextInput } from '../components/uiComponents/Inputs';
import { ARKMain } from '../components/uiComponents/ContentBlock';



const ClubLogin = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // 用戶點擊登錄按鈕
    const handleLoginPress = () => {
        // 賬戶輸入未完成
        if (account == '' || password == '') {
            console.log("賬密輸入未完成！");
            window.alert("錯誤！\n賬密輸入未完成！");
        } else {
            clubSignIn();
        }
    };

    return (
        <ARKMain title={t("CLUB_LOGIN")}>
            <Navbar />
            <Container className="flex flex-col w-full h-full items-center justify-center">
                {/* UI Block*/}
                <div className="block p-5 pb-10 bg-themeColorUltraLight dark:bg-gray-800 drop-shadow-xl rounded-lg items-center justify-center min-w-96 hover: cursor-pointer hover:scale-[1.02] transition-all">

                    {/* 標題 */}
                    <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                        <h1>{t("CLUB_LOGIN")}</h1>
                    </div>

                    <div className="flex felx-col items-center justify-center">
                        <form className={"space-y-4"} onSubmit={handleSubmit(clubSignIn)}>

                            <ARKTextInput
                                base={{ placeholder: t("CLUB_ACCOUNT") }}
                                regName={"account"}
                                register={register}
                            />

                            <ARKTextInput
                                base={{ placeholder: t("CLUB_PWD"), type: "password" }}
                                regName={"password"}
                                register={register}
                            />

                            <br />
                            <button
                                className="bg-themeColor py-2 px-10 mt-3 rounded-lg text-white font-bold hover:bg-themeColorLight hover:scale-105 transition-all">
                                {t("BTN_LOGIN")}
                            </button>

                        </form>
                    </div>

                </div>
            </Container>
        </ARKMain>
    );

};




export default ClubLogin;