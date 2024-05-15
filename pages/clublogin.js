// 包引用
import React, { useState } from 'react';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"
import { useTranslation } from "react-i18next";

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import Container from '../components/container';
import Navbar from '../components/navbar';



const ClubLogin = () => {

    const { t } = useTranslation();

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    // 計輸入框內的值入狀態
    const handleInputChange = (event) => {
        if (event.target.name === 'account') {
            setAccount(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    };

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

    // 異步驗證
    const clubSignIn = async () => {
        let data = {
            account: account + '',
            password: password + '',
        };
        let URL = BASE_URI + GET.CLUB_SIGN_IN;
        await axios.post(URL, qs.stringify(data), {
            // 使axios自動設置Cookies，登錄成功獲取ARK_TOKEN很重要
            withCredentials: true,
        }).then(res => {
            let json = res.data;
            // 登錄成功
            if (json.message == 'success') {
                console.log("登入成功！")
                localStorage.setItem("isClub", true);
                localStorage.setItem("ClubData", JSON.stringify(json));
                console.log(json);
                window.location.href = "./club/clubInfo";
            }
            // 登錄失敗
            else {
                console.log("登入失敗！");
                window.alert("登入失敗！請檢查賬號密碼是否正確。");
            }
        }).catch(err => {
            console.log("網路錯誤！")
            window.alert("網路錯誤！")
        });
    }


    return (
        <>
            <Navbar />
            <Container className="flex flex-col w-full h-full items-center justify-center">
                {/* UI Block*/}
                <div className="block p-5 pb-10 bg-themeColorUltraLight dark:bg-gray-800 drop-shadow-xl rounded-lg items-center justify-center min-w-96 hover: cursor-pointer hover:scale-105 transition ease-in-out">
                    <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                        <h1>{t("CLUB_LOGIN")}</h1>
                    </div>

                    <div className="flex felx-col items-center justify-center">
                        <ul className="space-y-4">
                            <li>
                                <p className="text-themeColor font-bold">
                                    {t("CLUB_ACCOUNT")}
                                </p>
                                <input
                                    className="border-2 border-themeColor rounded-lg h-10 p-2"
                                    placeholder={t("CLUB_ACCOUNT")}
                                    value={account}

                                    onChangeCapture={(event) => setAccount(event.target.value)}>
                                </input>
                            </li>
                            <li className="justify-center items-center">
                                <p className="text-themeColor font-bold">{t("CLUB_PWD")}</p>
                                <input
                                    className="border-2 border-themeColor rounded-lg h-10 p-2"
                                    placeholder={t("CLUB_PWD")}
                                    value={password}
                                    type="password"
                                    onChangeCapture={(event) => setPassword(event.target.value)}>
                                </input>
                            </li>
                            <li className="flex justify-center items-center">
                                <button
                                    className="bg-themeColor py-2 px-10 mt-3 rounded-lg text-white font-bold hover:bg-themeColorLight"
                                    onClick={handleLoginPress}>
                                    {t("BTN_LOGIN")}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    );

};




export default ClubLogin;