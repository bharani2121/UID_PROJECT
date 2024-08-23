import React, { useContext } from "react";
import { DialogContext } from "./Dialog";

export default function DialogTitle({ children }) {

  const onClose = useContext(DialogContext);

  return (
    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
      <h3 className="text-xl font-medium leading-normal text-gray-800">
        {children}
      </h3>


      <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-toggle="tooltip" data-bs-placement="top" title="Close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />


    </div>
  );
}