import React from "react";

export default function DialogActions({children}) {
  return (
    <div className="p-4 rounded-b border-t border-gray-200 dark:border-gray-600">
      <div className="flex space-x-4 justify-end ...">
        {children}
      </div>
    </div>
  );
}