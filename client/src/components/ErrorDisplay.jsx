import React from 'react'

import {useGlobally} from '../context/context'
import { FaTimes } from 'react-icons/fa'
import { useEffect } from 'react';

const ErrorDisplay = ({login=false}) => {
  const { ShowError, msg, success, toggleError } = useGlobally();
  useEffect(() => { }, [ShowError, msg, success])

    return (
      <div
        className={`${ShowError || "hidden"} ${
          login ? "absolute top-5" : "sticky top-16"
        } transition-all z-10 flex flex-col items-center justify-between w-screen`}
      >
        <div
          className={`flex items-center justify-between max-w-[500px] min-w-[200px] w-3/4 p-2 border
        ${success ? "bg-greenLight text-greenDark" : "bg-redLight text-redDark"}
        rounded-md text-md font-semibold`}
        >
          <h1 className="text-sm mx-auto">
            {msg}
          </h1>
          <FaTimes
            className={`${
              success ? "text-greenDark" : "text-redDark"
            }text-sm hover:text-black`}
            onClick={toggleError}
          />
        </div>
      </div>
    );
}

export default ErrorDisplay;