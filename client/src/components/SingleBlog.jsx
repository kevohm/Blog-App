import React from 'react'
import { Link } from 'react-router-dom'
import {images} from "../assets/images";
import { AiOutlineUser } from "react-icons/ai";
import { useGlobally } from '../context/context';

const SingleBlog = ({ data,link=true }) => {
  const {username} = useGlobally()
  
  return (
    data.map((blog) => {
      const { title, _id, createdAt, username: user } = blog;
      const index = 1;
        return (
          <div
            key={_id}
            className="flex flex-col max-w-[300px] min-w-[200px] w-screen justify-between w-full rounded-md bg-white drop-shadow-md
            hover:drop-shadow-lg "
          >
            {link  ? (
              <Link
                key={_id}
                to={`${_id}`}
                state={blog}
              >
                <img
                  className="w-full rounded-t-md max-h-[150px]"
                  src={images[index]}
                  alt="blogOne"
                />
              </Link>
            ) : (
              <img
                className="w-full rounded-t-md max-h-[150px]"
                src={images[index]}
                alt="blogOne"
              />
            )}
            <div className="flex flex-col p-1">
              <div className="text-black px-2 pt-1 text-md leading-tight text-bold">
                {title}
              </div>
              <div className="w-full flex items-center pt-3 p-2 justify-between font-sans text-blackMid">
                <div className="flex items-center text-blackMid">
                  <AiOutlineUser className="text-sm " />
                  {link ? (
                    <h1 className="px-1 text-sm capitalize text-semibold">
                      {user === username ? "you" : user}
                    </h1>
                  ) : (
                    <Link
                      className="px-1 text-sm capitalize text-semibold hover:text-purpleDark"
                        to={user}
                        state={user}
                    >
                      {user === username ? "you" : user}
                    </Link>
                  )}
                </div>
                <h1 className="text-[12px] text-blackLight">{createdAt}</h1>
              </div>
            </div>
          </div>
        );
    })
  )
}

export default SingleBlog