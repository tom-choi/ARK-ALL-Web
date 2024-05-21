/**
 * 帶標題的標準内容卡片
 * @param {*} props 
 * @prop {string} title 内容卡片的標題
 * @returns 
 */
export const ContentBlock = (props) => {
    let condition = props.condition != void 0 ? props.condition : true;
    return (
        condition && (
            <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                {/* 標題 */}
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-themeColor">{props.title ? props.title : '標題'}</h3>
                </div>
                {props.children}
            </div>
        )
    );
}

/**
 * 内容卡片分欄
 * @param {*} props 
 * @returns 
 */
export const ContentBlockGrid = (props) => {
    return (
        <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
            {props.children}
        </div>
    );
}