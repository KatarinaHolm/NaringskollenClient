import { useRef } from "react";
import ButtonSecondary from "./buttonSecondary";

export default function Modal({title, text, openModalButtonText, showConfirmButton, confirmButtonText, handleConfirmButtonClick}) {
    const dialogRef = useRef(null);

    function handleConfirm(){
        handleConfirmButtonClick();
        dialogRef.current.close();
    };

  return (
    <>    
      <ButtonSecondary    
        text={openModalButtonText}    
        onClick={() => dialogRef.current.showModal()}
      />    
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <form method="dialog">            
            <button className="btn btn-square btn-sm btn-ghost absolute right-2 top-2">
             <svg
              aria-label="Close"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{text}</p>
          {showConfirmButton && (
              <ButtonSecondary 
                text={confirmButtonText}
                onClick={handleConfirm}
                type="button"
                />
          )}
        </div>
      </dialog>
    </>
  );
}
