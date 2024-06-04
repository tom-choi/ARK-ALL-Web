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
export function u_handleFileChange(event, m_files, setFileFunc, isDrop, isSingle, numLimit = void 0) {

    // 複製一份文件
    const duplicateFile = (file) => {
        let newFileName = file.name + Date.now();
        return new File([file], newFileName, { type: file.type });
    };

    // 上傳單個文件
    if (isSingle) {
        let fileObj = isDrop ? event.dataTransfer.files[0] : event.target.files[0];
        if (!fileObj) {
            return void 0;
        }
        setFileFunc(duplicateFile(fileObj));
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
            fileArr.push(duplicateFile(fileRawArr[key]));
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

/**
 * 處理編輯時的刪除操作。歸一化服務器與本地圖片。
 * @param {*} e 刪除文件事件 
 * @param {int} indexToRemove 刪除文件的序號
 * @param {Array} m_files 文件所在的數組
 * @param {Function} setFileArrFunc 更改文件數組的函數 
 * @param {Function} setServerFileArrFunc 更改數據庫文件的函數
 * @returns 
 */
export function u_handleFileDelete(e, indexToRemove, m_files, setFileArrFunc, setServerFileArrFunc) {
    // 當前文件
    let curFile = m_files[indexToRemove];

    // 數組越界
    if (curFile == void 0 || indexToRemove >= m_files.length) {
        alert('刪除錯誤，請聯絡開發者。');
        return;
    }

    // item為string：服務器文件；item為Object：本地文件
    let isCurFileInServer = void 0;
    if (typeof curFile == 'object') {
        // 本地文件
        isCurFileInServer = false;
    } else if (typeof curFile == 'string') {
        // 服務器文件
        isCurFileInServer = true;
    } else {
        throw new Exception('不支持的文件類型！');
    }

    // 服務器邏輯
    if (isCurFileInServer) {
        setServerFileArrFunc(curFile);
        return;
    }

    // 本地邏輯
    const updatedFileArr = m_files;
    updatedFileArr.splice(indexToRemove, 1);
    updatedFileArr.push('');

    setFileArrFunc(updatedFileArr);

}
