import React from 'react'

import { Link, Navigate, useLocation } from 'react-router-dom'
import { useGlobally } from '../../context/context'


const Item = () => {
  const { deleteBlog,success,allow } = useGlobally();
  const { state } = useLocation()
  if (!state) {
    return <div className='w-full'> No blog to see</div>
  }
  return (
    <section className="mx-auto w-full p-2 md:w-3/4">
      <div className="w-full flex flex-col-reverse justify-between sm:flex-row">
        <h1 className="w-full text-center my-6 text-lg font-semibold sm:text-xl sm:w-3/4">
          {state.title}
        </h1>
        <div
          className="w-full items-center flex space-y-1 mt-2 flex-col  text-sm text-blackMid
        sm:flex-col sm:justify-center sm:items-center sm:w-1/4 sm:flex"
        >
          <h2 className="text-black mb-1">Last updated on</h2>
          <h2 className="text-center text-blackMid font-sans">
            {state.updatedAt}
          </h2>
        </div>
      </div>
      <div className="text-md px-2 mt-4 md:text-xl md:p-0">{state.text}</div>
      <div className="w-full flex justify-between p-4 mt-6">
        <Link
          className="bg-purpleLight text-black border rounded-md p-2 px-2 sm:px-4"
          to="/blog"
        >
          Back
        </Link>
        {allow && (
          <Link
            className="bg-blackLight border py-2 rounded-md px-3 sm:px-4"
            to={`/blog/create/${state._id}`}
            state={state}
          >
            Edit
          </Link>
        )}
        {allow && (
          <button
            className="bg-redLight border text-redDark py-2 rounded-md px-2 sm:px-4"
            onClick={(e) => {
              e.preventDefault();
              deleteBlog(state._id);
              if (success) {
                return <Navigate to="/blog/mine" />;
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </section>
  );
}
export default Item