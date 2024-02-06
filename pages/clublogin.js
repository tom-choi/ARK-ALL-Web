// 包引用
import React, {useState} from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import Container from '../components/container';
import Navbar from '../components/navbar';


const ClubLogin = () => {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    // 計輸入框內的值入狀態
    const handleInputChange = (event) => {
        if(event.target.name === 'account') {
            setAccount(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    };

    // 用戶點擊登錄按鈕
    const handleLoginPress = () => {
        // 賬戶輸入未完成
        if (account == '' || password == '') {
            console.log("賬密輸入未完成！")
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
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'post',
            url: BASE_URI + GET.CLUB_SIGN_IN,
            data: qs.stringify(data),
        }).then(res => {
            let json = res.data;
            // 登錄成功
            if (json.message == 'success') {
                console.log("登入成功！")
                localStorage.setItem("isClub",true);
                localStorage.setItem("ClubData",JSON.stringify(json));
            }
            // 登錄失敗
            else {
                console.log("登入失敗！")
            }
        }).catch(err => {
            console.log("網路錯誤！")
        });
    }


    return(
        <>
        <Navbar/>
        <Container className="flex flex-col w-full h-full items-center justify-center">
            {/* UI Block*/}
            <div className="block p-5 pb-10 bg-white drop-shadow-xl rounded-lg items-center justify-center min-w-96 ">
                <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                    <h1>社團賬號登入</h1>
                </div>

                <div className="flex felx-col items-center justify-center">
                    <ul className="space-y-4">
                        <li>
                            <p className="text-themeColor font-bold">社團名稱</p>
                            <input
                                className="border-2 rounded-lg h-10"
                                placeholder="社團賬號"
                                value={account}
                                onChangeCapture={(event) => setAccount(event.target.value)}>
                            </input>
                        </li>
                        <li className="justify-center items-center">
                            <p className="text-themeColor font-bold">登入密碼</p>
                            <input
                                className="border-2 rounded-lg h-10"
                                placeholder="密碼"
                                value={password}
                                onChangeCapture={(event) => setPassword(event.target.value)}>
                            </input>
                        </li>
                        <li className="flex justify-center items-center">
                            <button 
                                className="bg-themeColor py-2 px-5 rounded-lg text-white font-bold hover:bg-themeColorLight"
                                onClick={handleLoginPress}>
                                Login
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