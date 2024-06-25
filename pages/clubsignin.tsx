// 包引用
import React from 'react';
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";

// 本地引用
import Container from '../components/container';
import Navbar from '../components/navbar';
import { clubSignIn } from '../lib/authentication';
import { ARKTextInput } from '../components/uiComponents/Inputs';
import { ARKMain } from '../components/uiComponents/ContentBlock';
import { IClubSignin } from '../types/index.d';
import { useRouter } from 'next/router';

const ClubLogin = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IClubSignin>();

    const onSubmit: SubmitHandler<IClubSignin> = async (data: IClubSignin) => {
        return clubSignIn(data, router);
    };

    return (
        <ARKMain title={t("CLUB_LOGIN")} withOutMargin={true}>
            <Navbar />
            <Container className="flex flex-col w-full h-full items-center justify-center">
                {/* UI Block*/}
                <div className="block p-5 pb-10 bg-themeColorUltraLight dark:bg-gray-800 drop-shadow-xl rounded-lg items-center justify-center min-w-96 hover: cursor-pointer hover:scale-[1.02] transition-all">

                    {/* 標題 */}
                    <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                        <h1>{t("CLUB_LOGIN")}</h1>
                    </div>

                    {/* 登錄表單 */}
                    <div className="flex felx-col items-center justify-center">
                        <form className={"block space-y-4"} onSubmit={handleSubmit(onSubmit)}>

                            <ARKTextInput
                                base={{ placeholder: t("CLUB_ACCOUNT"), isRequired: true }}
                                regName={"account"}
                                thisErr={errors.account}
                                errText={"請輸入賬號"}
                                register={register}
                            />

                            <ARKTextInput
                                base={{ placeholder: t("CLUB_PWD"), type: "password", isRequired: true }}
                                regName={"password"}
                                thisErr={errors.password}
                                errText={"請輸入密碼"}
                                register={register}
                            />

                            <button
                                className="block mt-10 w-full bg-themeColor py-2 px-10 rounded-lg text-white font-bold hover:bg-themeColorLight hover:scale-105 transition-all"
                                type={"submit"}>
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
