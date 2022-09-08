import React, { useEffect, useState } from 'react'
import { useGlobally } from '../../context/context'
import SingleBlog from "../../components/SingleBlog";
import { FaSpinner } from "react-icons/fa"; 

const AllBlogs = () => {
  const { getBlogs, userBlogs, isLoading, noOfPages, username } = useGlobally();
  const [page, setPage] = useState(1)
  const [all, setAll] = useState(true);
  let num = []
  for (let i = 1; i <= noOfPages; i++) {
    num.push(i);
  }
  useEffect(() => {
    getBlogs(page);
  }, [page]);
  const handleClick = (e) => {
    e.preventDefault();
    setPage(Number(e.target.value))
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name } = e.target
    if (name === "all") {
      setAll(true);
    } else {
      setAll(false);
    }
  }
  if (isLoading) {
    return (
      <div className="w-full h-full m-auto text-sm text-black p-2">
        <FaSpinner className="m-auto text-blackMid text-4xl animate-spin" />
      </div>
    );
  }
  if (userBlogs.length === 0) {
    return (
      <div className="w-full h-full m-auto text-sm text-black p-2">
        <h1 className="text-sm text-black p-2">
          Oops, you seem to have no blogs yet
        </h1>
      </div>
    );
  }
  return (
    <div className="max-w-[1500px] mx-auto w-screen flex flex-col space-y-4 mt-5">
      <div className="w-full">
        <div className="w-44 my-3 mx-auto flex justify-between items-center text-md transition-all md:mb-8 md:mt-5">
          <button
            className={`transition-all p-1 px-4 rounded-full border-2 border-orangeDark font-bold ${
              all ? " bg-orangeDark text-white" : " bg-white text-orangeDark"
            } `}
            onClick={(e) => handleChange(e)}
            name="all"
          >
            all
          </button>
          <button
            className={`transition-all p-1 px-4 rounded-full border-2 border-orangeDark font-bold ${
              all ? " bg-white text-orangeDark" : " bg-orangeDark text-white"
            } `}
            onClick={(e) => handleChange(e)}
            name="yours"
          >
            for you
          </button>
        </div>
      </div>
      <section className="w-full flex flex-col items-center space-y-6 px-3 mt-2 sm:grid sm:items-start xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-2 sm:gap-y-6 sm:space-y-0">
        <SingleBlog
          data={
            all
              ? userBlogs
              : userBlogs.filter((item) => item.username === username)
          }
          link={false}
        />
      </section>
      {num.length === 1 || (
        <section className="w-full flex flex-col mx-auto p-3 bottom-10">
          <div className="pt-3 w-full">
            {num.map((item, index) => (
              <button
                className="p-1 px-2 font-sans font-semibold rounded-md text-blackMid bg-purpleLight m-1 transition-all hover:bg-purpleMid"
                onClick={(e) => handleClick(e)}
                key={index}
                value={item}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AllBlogs