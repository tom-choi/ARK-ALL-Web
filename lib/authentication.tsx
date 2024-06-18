// 包引用
import axios from 'axios';
import qs from 'qs';

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import { IClubSignin, IClubSigninResponse } from '../types/index.d';

/**
 * 符合條件時將用戶屏蔽。
 * @param msg 
 */
export const block = (msg?: string) => {
    alert(msg || '請前往登陸賬號！');
    window.location.href = '/clubsignin';
}

/**
 * 頁面守衛。如果沒有token或者沒有url參數，則導向登陸頁面。
 * @param authParams 
 * @prop {string} credentialName - 登錄認證的類型名稱，通常爲club_token，可不填。
 * @prop {string} urlParamName - URL參數名稱，必填。
 * @returns 
 */
export const authGuard = (authParams: {
    credentialName?: string,
    urlParamName: string
}): null | string => {
    let { credentialName, urlParamName } = authParams;

    // URL變量有誤
    if (urlParamName == void 0) {
        block(`URL有誤, 請重新登陸。`);
        return null;
    }
    const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (urlParams[urlParamName] == void 0) {
        block(`URL參數有誤, 請重新登陸。`);
        return null;
    }

    // 登錄認證過期
    const credential = localStorage.getItem(credentialName || "club_token");
    if (!credential) {
        block("登錄認證過期，請重新登陸。");
        return null;
    }

    return urlParams[urlParamName];
}

/**
 * 社團賬戶登錄
 * @param {IClubSignin} _data 
 */
export const clubSignIn = async (_data: IClubSignin): Promise<any> => {
    let data = {
        account: _data.account + '',
        password: _data.password + '',
    };

    // 賬號和密碼檢查
    if (!data.account || !data.password) {
        window.alert("請輸入賬號和密碼");
        return null;
    }

    let URL = BASE_URI + GET.CLUB_SIGN_IN;

    await axios.post(
        URL,
        qs.stringify(data),
        {
            withCredentials: true,   // 使axios自動設置Cookies，登錄成功獲取ARK_TOKEN很重要
        }).then(res => {
            let json: IClubSigninResponse = res.data;
            // 登錄成功
            if (json.message == 'success') {
                localStorage.setItem("club_token", json.token);
                window.location.href = `./club/clubInfo?club_num=${json.content.club_num}`;
                return json;
            }
            // 登錄失敗
            else {
                console.log("登入失敗:", json);
                window.alert("登入失敗！請檢查賬號密碼是否正確。");
            }
        }).catch(err => {
            console.log(err);
            window.alert("網路錯誤！請聯係開發者");
            return null;
        });
}