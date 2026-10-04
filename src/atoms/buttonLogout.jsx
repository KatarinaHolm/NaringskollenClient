export default function ButtonLogOut({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-neutral btn-active btn-sm md:btn-md lg:btn-lg" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}