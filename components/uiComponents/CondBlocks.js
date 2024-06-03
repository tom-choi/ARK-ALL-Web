/**
 * 條件單塊。只有滿足某個條件時才顯示，否則不顯示。
 * @param {*} props 
 * @returns 
 */
export const SingleCondBlock = (props) => {
    return (
        props.condition && (
            props.children
        )
    );
}

/**
 * 條件雙塊。條件滿足，顯示第一個子元素，否則顯示第二個子元素。
 * @param {*} props 
 * @returns 
 */
export const BiCondBlock = (props) => {
    return (
        props.condition ? (
            props.children[0]
        ) : (
            props.children[1]
        )
    );
}