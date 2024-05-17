/**
 * 上傳相關圖片。
 * @param {*} event 瀏覽器的事件，包含文件的對象
 * @param {*} m_files React中需要操作的文件state變量
 * @param {function} setFileFunc 設定文件的React State函數
 * @param {bool} isDrop 添加文件的方式，默認為點擊添加。也可拖拽添加。拖拽添加調用事件的dataTransfer而非target。
 * @param {bool} isSingle 文件是否爲單一
 * @param {int} numLimit 添加文件的數量限制。
 * @returns 
 */
export function handleFileChange(event, m_files, setFileFunc, isDrop, isSingle, numLimit = void 0) {

    // 上傳單個文件
    if (isSingle) {
        let fileObj = isDrop ? event.dataTransfer.files[0] : event.target.files[0];
        if (!fileObj) {
            return void 0;
        }
        setFileFunc(fileObj);
        return;
    }

    // 上傳多個文件
    let fileRawArr = isDrop ? event.dataTransfer.files : event.target.files;
    if (!fileRawArr) {
        return;
    }

    // 將object對象推入數組
    let fileArr = [];
    Object.keys(fileRawArr).map(
        key => {
            fileArr.push(fileRawArr[key]);
        }
    );

    // 如果數組中已經有數據，就插入新來的數據，不把原來的替換掉。
    if (m_files && m_files instanceof Array) {
        fileArr = m_files.concat(fileArr);
    }

    // 選擇文件數量限制
    if (numLimit && fileArr.length > Math.floor(numLimit)) {
        fileArr.slice(0, numLimit);
        window.alert(`總數不能超過${numLimit}張`);
        return;
    }

    setFileFunc(fileArr);
    return;
}
