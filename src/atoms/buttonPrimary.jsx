

export default function buttonPrimary({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-block" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}
