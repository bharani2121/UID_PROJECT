import React from "react";

export default function DialogContent({children}) {
  return (
    <div className="p-6 space-y-6">
      {children}
    </div>
  );
}