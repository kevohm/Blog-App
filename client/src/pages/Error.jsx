import React from 'react'
import error from "../assets/404.svg"
const Error = ()=>{
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img
        className='max-w-lg'
        src={error}
        alt="Error 404"
      />
    </div>
  );
}


export default Error
