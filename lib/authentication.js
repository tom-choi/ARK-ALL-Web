// 包引用
import axios from 'axios';
import qs from 'qs';

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';


/**
 * 社團賬戶登錄
 * @param {*} _data 
 */
export const clubSignIn = async (_data) => {
    let data = {
        account: _data.account + '',
        password: _data.password + '',
    };

    // 賬號和密碼檢查
    if (!data.account || !data.password) {
        window.alert("請輸入賬號和密碼");
        return;
    }

    let URL = BASE_URI + GET.CLUB_SIGN_IN;

    await axios.post(
        URL,
        qs.stringify(data), {
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
        console.log(err);
        window.alert("網路錯誤！請聯係開發者")
    });
}