import React,{useState } from 'react'
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import {useGlobally} from "../context/context"
import { FaCaretDown, FaCaretUp} from "react-icons/fa"


const Navbar = () => {
  const { username, LogoutUser} = useGlobally();
  const [dropDown, setDropDown] = useState(false)
  const handleClick = () => {
    setDropDown(!dropDown);
  }
  return (
    <>
      <div className="relative font-serif min-h-full w-full mt-16 pb-16 flex flex-col bg-orangeLight">
        <nav className="fixed top-0 z-10 w-screen flex items-center p-3 px-6 mx-auto justify-between bg-white md:py-3">
          <Link className="w-1/6 md:w-1/12" to="/">
            <img className="w-full" src={logo} alt={"logo"} />
          </Link>
          {username ? (
            <>
              <div
                className={`flex z-10 w-18 transition-all items-center text-md text-black p-1 mr-1 font-bold sm:text-lg bg-white `}
              >
                <Link
                  className="text-md p-1 mr-1 font-bold sm:text-lg"
                  to={`/blog/${username}`}
                >
                  {username}
                </Link>
                <div onClick={handleClick}>
                  {dropDown ? <FaCaretDown /> : <FaCaretUp />}
                </div>
              </div>

              <div
                className={`absolute overflow-hidden w-16 p-1 flex items-center justify-center right-10 top-5 text-center w-full bg-blackLight text-sm text-black font-semibold transition-all
              ${dropDown && " top-[60px]"}
              `}
              >
                <button
                  className="w-full hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    LogoutUser();
                    return;
                  }}
                >
                  logout
                </button>
              </div>
            </>
          ) : (
            <Link
              className="text-lg text-black font-bold hover:underline md:text-xl"
              to="auth"
            >
              login
            </Link>
          )}
        </nav>
        <Outlet />
        <section className="absolute w-full bottom-0 mt-32 p-2 text-center text-black font-semibold">
          <h1>copyright &copy; tyrantx 2022</h1>
        </section>
      </div>
    </>
  );
};
export default Navbar;
