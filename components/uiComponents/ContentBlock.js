export const ContentBlock = (props) => {
    return (
        <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
            {/* 標題 */}
            <div className="mb-3">
                <h3 className="text-xl font-bold text-themeColor">{props.title ? props.title : '標題'}</h3>
            </div>
            {props.children}
        </div>
    );
}