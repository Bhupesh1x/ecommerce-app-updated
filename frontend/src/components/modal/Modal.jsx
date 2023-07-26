import React from "react";

function Modal({ children, isLarge }) {
  return (
    <div className="h-screen w-full bg-[#00000062] z-[1000] flex items-center justify-center fixed top-0 left-0">
      <div
        className={`${
          isLarge ? "h-[65vh] md:w-[65%]" : "h-fit md:w-[45%]"
        } w-[90%] rounded-lg shadow-lg bg-white relative py-3 px-6 border-2 border-gray-200 overflow-y-scroll`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
