import React, { ReactNode } from "react";
import { FirstTitle } from "./LayeredTitles";
import Container from "../container";

/**
 * ARK 標準渲染頁面。
 * @prop {string} title - 頁面標題，即瀏覽器標籤頁標題
 * @returns 
 */
export const ARKMain = (props: {
    title: string,
    className?: string,
    children: ReactNode | ReactNode[]
}) => {
    return (
        <main>
            <title>
                {props.title || "Untitled"}
            </title>
            <Container className={props.className || ""}>
                {props.children}
            </Container>
        </main>
    );
}

/**
 * ARK 帶標題的標準内容卡片
 * @prop {boolean} condition - 卡片渲染的條件，為false時卡片不渲染。默認爲true。
 * @prop {string|undefined} title - 内容卡片的標題。
 * @prop {string|undefined} withTitle - 卡片是否顯示標題。
 * @returns 
 */
export const ContentBlock = (props: {
    condition?: boolean,
    children: ReactNode | ReactNode[],
    title?: string,
    className?: string
    styles?: {
        withTitle?: boolean,
        withBackground?: boolean,
    }
}) => {
    let { condition, title, className, styles = { withTitle: true, withBackground: true } } = props;
    let { withTitle, withBackground } = styles;
    let condition_ = condition != void 0 ? condition : true;
    let style = `bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center ${className || ""}`
    return (
        condition_ && (
            <div className={style}>
                {/* 標題 */}
                {withTitle && (
                    <FirstTitle>{title ? title : '標題'}</FirstTitle>
                )}
                {props.children}
            </div>
        )
    );
}

/**
 * ARK 内容卡片分欄
 * @prop {number} gridNum - 欄位數
 * @returns 
 */
export const ContentBlockGrid = (props: { gridNum?: number, children: ReactNode | ReactNode[] }) => {
    let gridNum = props.gridNum ? props.gridNum : 2;
    return (
        <div className={`lg:grid lg:grid-cols-${gridNum} md:block gap-4 items-top justify-center mt-5`}>
            {props.children}
        </div>
    );
}

/**
 * ARK IF條件渲染塊。只有滿足某個條件時才顯示，否則不顯示。
 * @prop {bool} condition   渲染條件。為true時渲染子元素，為false時不渲染子元素。
 * @returns 
 */
export const IF = (props: { condition: boolean, children: ReactNode | ReactNode[] }) => {
    return (
        props.condition && (
            props.children
        )
    );
}

/**
 * ARK IFELSE條件渲染塊。條件滿足，顯示第一個子元素，否則顯示第二個子元素。
 * @example
 * <IFELSE condition={val}>
 *      <div>...</div>   <!--   val為true時渲染   -->
 *      <div>...</div>   <!--   val為false時渲染  -->
 * </IFELSE>
 * @param {*} props
 * @prop {bool} val   渲染條件。為true時渲染第一個子元素，為false時渲染第二個子元素。 
 * @returns 
 */
export const IFELSE = (props: { condition: boolean; children: ReactNode[] }) => {
    return (
        props.condition ? (
            props.children[0]
        ) : (
            props.children[1]
        )
    );
}