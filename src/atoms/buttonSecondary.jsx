
export default function ButtonSecondary({text, onClick, type, disabled, isLoading, loadingText, className = ""}){

    return(
        <button className={`btn btn-neutral btn-active btn-sm md:btn-md lg:btn-lg w-full max-w-lg mt-4 ${className}`} onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}
