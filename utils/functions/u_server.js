import axios from 'axios';
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
export async function upload(uploadFormData, apiURL, clearLocalStorage, returnLoc, guard = true, askUserConfirm = true) {

    let isUserConfirmUpload = true;
    if (askUserConfirm) {
        isUserConfirmUpload = confirm("您即將上傳！");
    }

    // 校驗輸入滿足要求
    let allowUpload = guard && clearLocalStorage != '' && returnLoc != '' && isUserConfirmUpload;
    if (!allowUpload) {
        return;
    }

    // 制作表单
    // let uploadData = new FormData();
    // Object.entries(dataJson).forEach(([key, value]) => {
    //     if (value instanceof Array && value.length > 0) {
    //         value.map(item => {
    //             uploadData.append(key, item);
    //         })
    //     } else if (value instanceof Array && value.length == 0) {
    //         uploadData.append(key, "[]");
    //     } else {
    //         uploadData.append(key, value);
    //     }
    // });

    // 上传服务器
    let URL = apiURL;
    await axios.post(
        URL,
        uploadFormData,
        { withCredentials: true, }
    ).then(res => {
        let json = res.data;
        if (json.message == 'success') {
            alert('上傳成功！');
            localStorage.removeItem(clearLocalStorage);
            window.location.href = returnLoc;
        } else {
            alert('上傳失敗！');
        }
    }).catch(err => {
        alert('請求錯誤，請檢查網路。');
    });
}
