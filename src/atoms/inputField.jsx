import { useInputValidation } from "../hooks/useInputValidation"

export default function InputField({label, type, placeholder, value, onChange, name, required, disabled=false}){
  const {inputError, handleFocus, handleBlur, handleInvalid} = useInputValidation();
  
  return(
   <fieldset className="fieldset">
   <label htmlFor={name} className="label">
    {label}
    {required && <span className="required"> *</span>}
    </label>    
    
    <input 
    className="input" 
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

    <div className="validator-hint hidden">{inputError}</div>   

    {disabled  && (
        <div className="fieldset-label text-base-content/70 text-xs mt-1" aria-live="polite">
            {/* If want disabled text */}
        </div>   
    )}   
</fieldset>
  )
}
