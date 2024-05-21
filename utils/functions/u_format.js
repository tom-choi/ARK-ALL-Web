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
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const hour = dateObj.getUTCHours();
    const minute = dateObj.getUTCMinutes();

    let minuteStr = minute.toString();
    if (minute == 0) {
        minuteStr = '0' + minuteStr;
    }

    return {
        "Year": year,
        "Month": month,
        "Day": day,
        "Hour": hour,
        "Minute": minuteStr,
    }
}