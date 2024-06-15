/**
 * 將時間字符串轉換爲目標格式。
 * @param {*} date  日期
 * @param {*} time  時間
 * @param {*} divider   分隔符號 
 * @returns 格式化的日期字符串
 */
export const squashDateTime = (date, time, divider = " ") => {
    return date + divider + time;
}

/**
 * 分割時間序列
 * @param {string} timestamp 時間戳
 * @returns 對象，包含：年、月、日、時、分
 */
export const parseTimeString = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getUTCFullYear().toString();
    const month = (dateObj.getUTCMonth() + 1).toString();
    const day = dateObj.getUTCDate().toString();

    let hour = dateObj.getUTCHours();
    const hourStr = hour > 9 ? hour.toString() : '0' + hour.toString();

    let minute = dateObj.getUTCMinutes();
    const minuteStr = minute > 9 ? minute.toString() : '0' + minute.toString();

    return {
        "Year": year,
        "Month": month,
        "Day": day,
        "Hour": hourStr,
        "Minute": minuteStr,
    }
}

/**
 * 將JSON對象轉換為表單數據。
 * @param {*} data - JSON數據
 * @returns - 創建的表單對象
 */
export const JsonToFormData = (data) => {
    let fd = new FormData();
    for (var key in data) {
        fd.append(key, data[key]);
    }
    return fd;
}

// 複製一份文件
export const duplicateFile = (file) => {
    let newFileName = file.name + Date.now();
    return new File([file], newFileName, { type: file.type });
};
