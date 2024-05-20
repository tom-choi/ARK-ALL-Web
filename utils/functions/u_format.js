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