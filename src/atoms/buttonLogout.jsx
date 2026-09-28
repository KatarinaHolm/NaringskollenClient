export default function ButtonLogOut({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-neutral btn-sm md:btn-md lg:btn-lg my-2" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}