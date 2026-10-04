

export default function ButtonPrimary({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-active btn-sm md:btn-md lg:btn-lg xl:btn-xl w-full max-w-lg my-4" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}
