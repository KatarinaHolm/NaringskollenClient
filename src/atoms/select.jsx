
export default function Select({label, placeholder, value, onSelectChange, options}){

    return(
        <>
        <label 
         htmlFor="select" 
         className="sr-only">
            {label}
        </label>

        <select 
        id="select" 
        value={value} 
        onChange={(e) => onSelectChange(e.target.value)}
        className="select"
        >
            <option value="" disabled hidden>
                {placeholder}
            </option>
            
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}           
        </select>
        </>
    )
}