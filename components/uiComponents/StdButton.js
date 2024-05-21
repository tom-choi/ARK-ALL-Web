/**
 * 標準按鈕樣式
 * @param {*} props 
 * @prop {string} color Tailwind CSS中規定的顔色樣式
 * @prop {function} onClickFunc 點擊按鈕後要執行的函數
 * @prop {string} textContent 按鈕顯示的文字
 * @prop {React.Component} Icon 按鈕顯示的圖標
 * @returns 
 */
export const StdButton = (props) => {
    const { color, onClickFunc, textContent, Icon } = props;

    const btnStyle = "flex " + color + " py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer";

    return (
        <div className="flex items-center justify-center mx-5" onClick={onClickFunc} >
            <div className={btnStyle}>
                <div className="flex flex-col justify-center">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center ml-3">
                    <span>{textContent}</span>
                </div>
            </div>
        </div>
    );
}