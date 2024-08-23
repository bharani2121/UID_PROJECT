import React, { createContext } from "react";
import "./Dialog.css";

export const DialogContext = createContext();

export default function Dialog(props) {
  const { onClose } = props;

  return (
    <DialogContext.Provider value={onClose}>
      <div className="modal-backdrop-dark" />
      <div id="defaultModal" tabIndex={-1} className="above-element overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow-2xl drop-shadow-2xl dark:bg-gray-700">
            {props.children}
          </div>
        </div>
      </div>
    </DialogContext.Provider>
  );
}