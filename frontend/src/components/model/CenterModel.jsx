import React from "react";

function CenterModel({ children }) {
  return (
    <div className="h-screen w-full bg-[#00000062] z-[1000] flex items-center justify-center fixed top-0 left-0">
      <div className="h-fit w-[90%] md:w-[45%] rounded-lg shadow-lg bg-white relative py-3 px-6 border-2 border-gray-200">
        {children}
      </div>
    </div>
  );
}

export default CenterModel;
