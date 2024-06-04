import { FirstTitle } from "./LayeredTitles";

/**
 * 帶標題的標準内容卡片
 * @param {*} props 
 * @prop {string} title 内容卡片的標題
 * @prop {bool} condition 顯示的條件
 * @returns 
 */
export const ContentBlock = (props) => {
    let condition = props.condition != void 0 ? props.condition : true;
    return (
        condition && (
            <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                {/* 標題 */}
                <FirstTitle>{props.title ? props.title : '標題'}</FirstTitle>
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
    let gridNum = props.gridNum ? props.gridNum : 2;
    return (
        <div className={`lg:grid lg:grid-cols-${gridNum} md:block gap-4 items-top justify-center mt-5`}>
            {props.children}
        </div>
    );
}

/**
 * IF條件渲染塊。只有滿足某個條件時才顯示，否則不顯示。
 * @param {*} props 
 * @prop {bool} condition   渲染條件。為true時渲染子元素，為false時不渲染子元素。
 * @returns 
 */
export const IF = (props) => {
    return (
        props.condition && (
            props.children
        )
    );
}

/**
 * ELSE條件渲染塊。條件滿足，顯示第一個子元素，否則顯示第二個子元素。
 * @example
 * <IFELSE condition={val}>
 *      <div>...</div>   <!--   val為true時渲染   -->
 *      <div>...</div>   <!--   val為false時渲染  -->
 * </IFELSE>
 * @param {*} props
 * @prop {bool} val   渲染條件。為true時渲染第一個子元素，為false時渲染第二個子元素。 
 * @returns 
 */
export const IFELSE = (props) => {
    return (
        props.condition ? (
            props.children[0]
        ) : (
            props.children[1]
        )
    );
}