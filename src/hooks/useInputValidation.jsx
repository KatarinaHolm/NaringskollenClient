import { useState } from "react";

export const useInputValidation = () => {
    const [inputError, setInputError] = useState("");

    const handleFocus =() => {
        setInputError("");
    }

    const handleBlur = (e) => {
        if (!e.target.validity.valid){
        setInputError(e.target.validationMessage);
        } else {
        setInputError("");
        }
    }

    const handleInvalid = (e) => {
        setInputError(e.target.validationMessage);
    }

    const handleError = (error) => {
        if(error){
            setInputError(error);
        }
        else{
            setInputError("");
        }
    }

    return{ inputError, setInputError, handleFocus, handleBlur, handleInvalid, handleError };
};