import React, { useEffect,useState} from "react";
import SingleBlog from "../../components/SingleBlog"
import {useGlobally} from '../../context/context'
import { Link, useParams, useLocation } from "react-router-dom";
import {  FaSpinner } from "react-icons/fa";
import { IoMdSettings, IoMdAddCircle } from "react-icons/io";


const Blog = () => {
  const { userBlogs, allow, getBlogs, isLoading, noOfPages, username } = useGlobally();
  const [page, setPage] = useState(1);
  const { username:user } = useParams()
  const { state } = useLocation()
  const [hover, setHover] = useState(false)
  let num = [];
  for (let i = 1; i <= noOfPages; i++) {
    num.push(i);
  }
  useEffect(() => {
    getBlogs(page, user);
  }, [page, user]
  )
  const handleClick = (e) => {
    e.preventDefault();
    console.log(page);
    setPage(Number(e.target.value));
  };
  const handleTransition = (e) => {
    e.preventDefault()
    setHover(!hover)
  }
  if (isLoading) {
    return (
      <div className="w-full h-full m-auto text-sm text-black p-2">
        <FaSpinner className="m-auto text-blackMid text-4xl animate-spin" />
      </div>
    );
  }
    return (
      <div className="w-screen flex flex-col pt-4 h-full">
        <div className="relative container flex items-center mx-auto w-full mb-10 p-1 h-[50px] sm:p-1">
          <Link to={"/blog"} className="absolute p-1 text-sm rounded-md border border-blackLight text-black bg-purpleLight mr-3 drop-shadow-sm sm:text-lg hover:drop-shadow-md hover:border-blackMid">
            back
          </Link>
          <div className="m-auto bg-white rounded-md text-black text-semibold border border-blackLight text-center p-1 sm:p-2">
            {`Blogs created by ${user === username ? "you":user}`}
          </div>
          {allow && <div
            className={` absolute right-1 w-10 flex flex-col items-start bg-black text-white overflow-hidden p-2 space-y-3 rounded-sm
           transition-all md:w-28 ${hover && "top-[5px] space-y-2"
              }`}
            onClick={(e) => handleTransition(e)}
          >
            <div className="flex items-center space-x-1 cursor-pointer">
              <IoMdSettings className="text-2xl p-px" />
              <h1 className="hidden md:flex">setting</h1>
            </div>
            {hover && (
              <Link
                title="add new blog"
                className="flex items-center justify-between space-x-1"
                to="/blog/create"
                state={username}
              >
                <IoMdAddCircle title="add blog" className="text-2xl" />
                <h1 className="hidden md:flex">add blog</h1>
              </Link>
            )}
          </div>}
        </div>
        <section className="w-full flex flex-col items-center space-y-6 px-3 mt-2 sm:grid sm:items-start xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-2 sm:gap-y-6 sm:space-y-0">
          <SingleBlog
            data={
              state
                ? userBlogs.filter((item) => item.username === state)
                : userBlogs.filter((item) => item.username === username)
            }
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
export default Blog