import React from 'react'

const SvgDisplay = ({ children, text, className }) => {
  return (
    <section
      className={`flex flex-col items-center bg-white max-w-[400px] w-full justify-evenly h-56 p-6  text-black rounded-md md:flex-col border md:p-6 ${className}`}
    >
      {children}
      <p className="text-md text-center py-3 font-semibold tracking-tighter md:text-xl md:w-full">
        {text}
      </p>
    </section>
  );
};

export default SvgDisplay