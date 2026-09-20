import { useState } from "react";

export default function SearchAutoComplete({value, onChange, results, onSelect}){
    const [isFocused, setIsFocused] = useState(false);

    function handleBlur(){
        setTimeout(() => setIsFocused(false), 300);        
    }

    // Add if no match found

  return (
    <div className="relative w-full max-w-lg">
      <label className="input w-full">
        <span className="sr-only">Sök livsmedel</span>
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input 
         type="search" 
         name="searchAutoComplete"
         className="grow" 
         placeholder="Sök livsmedel"
         required
         value ={value}
         onChange={onChange}
         onFocus={() => setIsFocused(true)}
         onBlur={handleBlur}
          />
      </label>

      {isFocused && results.length > 0 &&(
        <div className="absolute z-50 left-0 right-0 w-auto bg-base-100 shadow rounded-box mt-1 border border-base-300 max-h-60 overflow-y-auto overflow-x-hidden">
        <ul className="menu bg-transparant p-1 w-full">
            {results.map((foodItem) => (
                <li key={foodItem.id} className="w-full">
                    <button 
                    className="grid grid-cols-12 items-center w-full gap-2 text-left"                  
                    onClick={() => onSelect(foodItem)}
                    >
                      <span className="col-span-7 truncate">{foodItem.name}</span>
                      <span className="text-xs text-base-content/50  col-span-5 text-right truncate">{foodItem.category}</span>                      
                    </button>
                </li>
            ))}
        </ul>
        </div>
    )}
    </div>
  );
}
