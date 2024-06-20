import React from 'react';
import axios from 'axios';
import { BASE_URI, BASE_HOST, GET, POST } from '../utils/pathMap';
import { squashDateTime, JsonToFormData } from '../utils/functions/u_format';
import moment from 'moment';
import { IGetClubInfo, IGetActivitiesByClub, _ICreateActivity, IGetAvtivityById, IEditActivityLocal } from '../types/index.d';

export const appendListToFormData = (
    fd: FormData,
    listName: string,
    list: any[] | undefined | null,
    mode: "object" | "array"
): FormData => {
    if (!list || (mode == "object" ? Object.values(list) : list).length == 0) {
        fd.append(listName, "[]");
        return fd;
    }

    if (mode == "object") {
        Object.values(list).map(listItem => {
            fd.append(listName, listItem);
        })
    } else {
        fd.append(listName, JSON.stringify(list));
    }

    return fd;
}

export const createFormData = (_data: any): FormData | null => {
    if (!_data || Object.keys(_data).length == 0) {
        return null;
    }

    let fd = new FormData();

    Object.entries(_data).map(([key, value]) => {
        // Non Iterables
        if (typeof value === "string" || typeof value === "number") {
            let value_ = value as string | number;
            fd.append(key, value_.toString() || "");
        }
        // Iterables
        else if (value instanceof Array) {
            appendListToFormData(fd, key, value, "array");
        } else if (Object.keys(value).length > 0) {
            let value_ = value as any;
            appendListToFormData(fd, key, value_, "object");
        } else {
            console.log(value);
            fd.append(key, "");
        }
    });
}

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
        console.log(err);
        alert('請求錯誤，請檢查網路。');
    });

}

/**
 * 創建活動。
 * @param {*} _data - 傳入的活動數據
 */
export const createActivity = async (_data: _ICreateActivity, clubNum: string): Promise<any> => {

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
    await upload(fd, BASE_URI + POST.EVENT_CREATE, 'createdActivityInfo', `../club/clubInfo?club_num=${clubNum}`, true, true);
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
            return json;
        } else if (alert) {
            window.alert(alert);
        }
    }).catch(err => {
        console.log(err);
        window.alert('網絡錯誤！');
    });
}

/**
 * 通過活動ID獲取活動訊息。
 * @param _id 
 * @param setFunc 
 */
export const getActivityById = async (_id: string, setFunc: any) => {
    await axios(
        {
            headers: { 'Content-Type': 'application/x-ww-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET.EVENT_INFO_EVENT_ID + _id,
        }).then(resp => {
            let json: IGetAvtivityById = resp.data;
            if (json.message = "success") {
                setFunc(json);
            } else {
                window.alert("無法獲取活動訊息！");
                return null;
            }
        }).catch(err => {
            console.log(err);
            window.alert("網路錯誤！");
            return null;
        });
}

/**
 * 編輯活動
 * @param _data - 活動編輯表單數據 
 * @param clubNum - 登錄club號碼
 */
export const editActivity = async (_data: IEditActivityLocal, clubNum: string) => {
    let _startdatetime = squashDateTime(_data.sDate, _data.sTime, "T");
    let _enddatetime = squashDateTime(_data.eDate, _data.eTime, "T");

    let fd = new FormData();
    fd.append("id", _data.id);
    fd.append("title", _data.title);
    fd.append("type", _data.type);
    fd.append("link", _data.link);
    _data.cover_image_file && fd.append("cover_image_file", _data.cover_image_file);
    fd.append("startdatetime", _startdatetime);
    fd.append("enddatetime", _enddatetime);
    appendListToFormData(fd, "add_relate_image", _data.add_relate_image, "object");
    appendListToFormData(fd, "del_relate_image", _data.del_relate_image, "array");
    fd.append("location", _data.location);
    fd.append("introduction", _data.introduction);
    fd.append("can_follow", true.toString());

    return upload(fd, BASE_URI + POST.EVENT_EDIT, void 0, `./activityDetail?activity_id=${_data.id}&club_num=${clubNum}`);
}


/**
 * 刪除活動
 * @param activityId - 活動ID
 * @param loginClubNum - 登錄club number
 * @param confirmMsg - 用戶確認訊息
 * @returns 
 */
export const deleteActivity = async (activityId: string, loginClubNum: string, confirmMsg: string) => {
    if (confirmMsg) {
        let prompt = confirm(confirmMsg);
        if (!prompt) return;
    }

    let URL = BASE_URI + POST.EVENT_DEL;
    let fd = new FormData();
    fd.append("id", activityId);
    return upload(fd, URL, void 0, `./clubInfo?club_num=${loginClubNum}`);
}
