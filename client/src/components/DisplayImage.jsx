import React from 'react'
import { FaUserShield, FaFire, FaCheckDouble } from "react-icons/fa";
import SvgDisplay from './SvgDisplay'
const DisplayImage = () => { 

  return (
    <main className="flex flex-col w-screen mt-12">
      <div className="w-full underlined mb-10 text-2xl font-bold text-black md:text-4xl">
        Core Values
      </div>
      <div className="bg-white flex flex-col mx-auto w-full max-w-[1400px] mb-32 space-y-8 space-x-0 p-6 py-8 justify-evenly items-center md:space-y-0 md:space-x-4 md:flex-row">
        <SvgDisplay
          className="bg-purpleLight border-purpleDark text-purpleDark"
          text="User secured blogging"
        >
          <FaUserShield className="text-6xl text-purpleDark md:text-7xl" />
        </SvgDisplay>
        <SvgDisplay
          className="bg-blackLight text-black border-black"
          text="Cool interface to interact with"
        >
          <FaFire className="text-6xl text-black md:text-7xl" />
        </SvgDisplay>
        <SvgDisplay
          className="bg-orangeLight text-orangeDark border-orangeDark"
          text="Easy to use"
        >
          <FaCheckDouble className="text-6xl text-orangeDark md:text-7xl" />
        </SvgDisplay>
      </div>
    </main>
  );
}

export default DisplayImage