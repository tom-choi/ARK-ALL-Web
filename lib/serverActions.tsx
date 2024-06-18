import axios from 'axios';
import { BASE_URI, BASE_HOST, GET, POST } from '../utils/pathMap';
import { squashDateTime, JsonToFormData } from '../utils/functions/u_format';
import moment from 'moment';
import { IGetClubInfo, IGetActivitiesByClub, _ICreateActivity } from '../types/index.d';

/**
 * 異步上傳内容到服務器。
 * @param {FormData} uploadFormData 即将上传的表单数据。
 * @param {string} apiURL 服務器API路徑。
 * @param {string} clearLocalStorage 清除本地緩存名称。
 * @param {string} returnLoc 導航回來的頁面。
 * @param {bool} guard 檢查輸入是否滿足要求。
 * @param {bool} askUserConfirm 是否要求用戶確認上傳。
 * @returns 
 */
export async function upload(
    uploadFormData: FormData,
    apiURL: string,
    clearLocalStorage?: string,
    returnLoc?: string,
    guard: boolean = true,
    askUserConfirm: boolean = false
): Promise<any> {

    let isUserConfirmUpload = true;
    if (askUserConfirm) {
        isUserConfirmUpload = confirm("您即將上傳！");
    }

    // 校驗輸入滿足要求
    let allowUpload = guard && returnLoc != '' && isUserConfirmUpload;
    if (!allowUpload) {
        return;
    }

    // 上传服务器
    let URL = apiURL;
    await axios.post(
        URL,
        uploadFormData,
        { withCredentials: true, }
    ).then(res => {
        // console.log(res.data);
        let json = res.data;
        if (json.message == 'success') {
            alert('成功！');
            clearLocalStorage != void 0 && localStorage.removeItem(clearLocalStorage);
            returnLoc != void 0 && (window.location.href = returnLoc);
        } else {
            alert('失敗！');
            console.log(json);
        }
    }).catch(err => {
        alert('請求錯誤，請檢查網路。');
    });

}

/**
 * 創建活動。
 * @param {*} _data - 傳入的活動數據
 */
export const createActivity = async (_data: _ICreateActivity): Promise<any> => {

    // 時間合理性判定
    let _startdatetime = squashDateTime(_data.sDate, _data.sTime);
    let _enddatetime = squashDateTime(_data.eDate, _data.eTime);
    if (!moment(_startdatetime).isSameOrBefore(_enddatetime)) {
        alert("結束時間應該在開始時間後！");
        return;
    }

    // 規範化時間序列為 YYYY-MM-DDTHH:MM:SS
    const { sDate, sTime, eDate, eTime, add_relate_image, ...restData } = _data;
    let startdatetime = squashDateTime(_data.sDate, _data.sTime, "T");
    let enddatetime = squashDateTime(_data.eDate, _data.eTime, "T");

    // 注意這裏缺少了add_relate_image
    let data = { startdatetime: startdatetime, enddatetime: enddatetime, ...restData };
    console.log(data);

    // 將data塞入表單
    let fd = JsonToFormData(data);
    if (add_relate_image) {
        // 圖片數組特殊處理
        Object.values(add_relate_image).map(imageFileObj => {
            fd.append('add_relate_image', imageFileObj);
        });
    } else {
        fd.append('add_relate_image', "[]");
    }

    // 上傳
    await upload(fd, BASE_URI + POST.EVENT_CREATE, 'createdActivityInfo', '../club/clubInfo', true, true);
}


/**
 * 根據社團號碼獲取相關訊息
 * @param {*} curClubNum - 當前帳號號碼
 * @param {string} GET_URL - API路徑
 */
export const getClubXX = async (
    curClubNum: number | string,
    GET_URL: string,
    setFunc: any,
    alert?: string,
    debug: boolean = false,
): Promise<any> => {
    await axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        method: 'get',
        url: BASE_URI + GET_URL + curClubNum,
    }).then(resp => {
        let json = resp.data;
        if (json.message == 'success') {
            setFunc(json);
            debug && console.log(json);
        } else if (alert) {
            window.alert(alert);
        }
    }).catch(err => {
        window.alert('網絡錯誤！');
    });
}