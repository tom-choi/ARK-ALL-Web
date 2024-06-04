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