import { useInputValidation } from "../hooks/useInputValidation"

export default function Input({type, placeholder, value, onChange, name, required, disabled=false, disabledInfoText}){
  const {inputError, handleFocus, handleBlur, handleInvalid} = useInputValidation();
  
  return(
   <>
   <label htmlFor={name} className="input">
    <span className="sr-only">{placeholder}</span>
    {required && <span className="required">*</span>}
    <input 
    className="grow" 
    id={name} 
    type={type} 
    placeholder={placeholder} 
    value={value}
    onChange={onChange} 
    name={name} 
    required={required} 
    disabled={disabled}
    onFocus={handleFocus}
    onBlur={handleBlur}   
    onInvalid={handleInvalid}      
    />
    </label>

    <div className="validator-hint hidden">{inputError}</div>   

    {disabled && disabledInfoText && (
        <div className="fieldset-label text-base-content/70 text-xs mt-1" aria-live="polite">
            {disabledInfoText}
        </div>   
    )}   
</>
  )
}
