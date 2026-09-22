
export default function buttonSecondary({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-neutral mt-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}