
export const FirstTitle = (props) => {
    return (
        <div className="mb-3">
            <h3 className="text-xl font-bold text-themeColor">{props.children}</h3>
        </div>
    );
}

export const SecondTitle = (props) => {
    return (
        <div className="mb-3">
            <h3 className="text-lg font-bold text-themeColor">{props.children}</h3>
        </div>
    );
}