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
import { useLoginStore } from '../states/state';
import Link from "next/link";

const ClubLogin = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const setLogin = useLoginStore(state => state.setLogin);

    const { register, handleSubmit, formState: { errors } } = useForm<IClubSignin & { agreeTA: boolean }>();

    const onSubmit: SubmitHandler<IClubSignin> = async (_data: IClubSignin & { agreeTA: boolean }) => {
        const { agreeTA, ...data } = _data;
        return clubSignIn(data, { router: router, setLogin });
    };

    return (
        <ARKMain title={t("CLUB_LOGIN")} withOutMargin={true}>
            <Navbar selected={"ClubSignin"} />
            <Container className="flex flex-col w-full h-full items-center justify-center p-20">
                {/* UI Block*/}
                <div className="block p-5 pb-10 bg-themeColorUltraLight dark:bg-gray-800 drop-shadow-xl rounded-lg items-center justify-center min-w-96 hover: cursor-pointer hover:scale-[1.02] transition-all">

                    {/* 標題 */}
                    <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                        <h1>{t("CLUB_LOGIN")}</h1>
                    </div>

                    {/* 登錄表單 */}
                    <div className="flex felx-col items-center justify-center">
                        <form className={"block space-y-4"} onSubmit={handleSubmit(onSubmit)}>

                            {/* 賬號 */}
                            <ARKTextInput
                                base={{ placeholder: t("CLUB_ACCOUNT"), isRequired: true }}
                                regName={"account"}
                                thisErr={errors.account}
                                errText={"請輸入賬號"}
                                register={register}
                            />

                            {/* 密碼 */}
                            <ARKTextInput
                                base={{ placeholder: t("CLUB_PWD"), type: "password", isRequired: true }}
                                regName={"password"}
                                thisErr={errors.password}
                                errText={"請輸入密碼"}
                                register={register}
                            />

                            {/* 登錄 */}
                            <button
                                className="block mt-10 w-full bg-themeColor py-2 px-10 rounded-lg text-white font-bold hover:bg-themeColorLight hover:scale-105 transition-all"
                                type={"submit"}>
                                {t("BTN_LOGIN")}
                            </button>

                            {/*用戶協議 */}
                            <div className={"flex flex-col justify-center"}>
                                <div className={"flex flex-wrap items-center tap-2 text-sm "}>
                                    <input
                                        type={"checkbox"}
                                        className={"mr-2"}
                                        {...register("agreeTA", { required: "您需要同意該協議以登錄賬號。" })} />
                                    <p className={"opacity-80 font-bold"}>
                                        我已同意並遵守
                                        <Link href={"/user_agreement"} className={"text-themeColor hover:scale-105 transition-all"}>
                                            《ARK ALL 用戶協議》
                                        </Link>
                                    </p>
                                </div>
                                {errors.agreeTA && (
                                    <p className={"text-alert text-sm font-bold text-center"}>
                                        {errors.agreeTA?.message || "未正確輸入！"}
                                    </p>
                                )}
                            </div>

                        </form>

                    </div>



                </div>
            </Container>
        </ARKMain>
    );

};




export default ClubLogin;
