
export default function ButtonSecondary({text, onClick, type, disabled, isLoading, loadingText}){

    return(
        <button className="btn btn-neutral btn-sm md:btn-md lg:btn-lg w-full max-w-lg my-4" onClick={onClick} type={type} disabled={disabled || isLoading} >
        {isLoading ? loadingText: text}
        </button>
    );
}