export const AfterLoading = (props) => {

    return (
        props.isLoading == true ? null : (props.children)
    );
}