import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useGlobally } from '../context/context';

const FormatData = ({ myUsername,initialBody={text:'',title:''}, hideUpdate=true, id=''}) => {
  const [body, setBody] = useState(initialBody);
  console.log(myUsername);
  const { createBlog, updateBlog, username} = useGlobally();
  const handleSubmit = (e) => {
    e.preventDefault();
    hideUpdate ? createBlog(body) : updateBlog(body, id);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };
  return (
    <section className="w-full m-2 mt-5 h-screen">
      <form
        className="container m-auto space-y-4 p-6 h-full rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="w-full px-4 text-blackMid">
          Dear, {username}
          {hideUpdate
            ? " here to create a new blog."
            : " here to update your blog."}
        </h1>
        <input
          name="title"
          placeholder="title for your blog"
          value={body.title}
          className="w-full outline-none bg-white border border-blackLight text-blackMid rounded-md p-2 px-4"
          onChange={(e) => handleChange(e)}
          required
        />
        <textarea
          placeholder="contents of your blog"
          name="text"
          value={body.text}
          className="w-full h-3/4 outline-none bg-white text-blackMid border border-blackLight rounded-md p-4"
          style={{ resize: "none" }}
          required
          onChange={(e) => handleChange(e)}
        />
        <div className="w-full p-1 flex rounded-md">
          <Link
            title="go back"
            to={"/blog"}
            className="p-2 px-6 mr-auto bg-blackMid hover:bg-black text-white text-md rounded-lg"
          >
            back
          </Link>
          {myUsername === username && <button
            title={hideUpdate ? "create new blog" : "update your blog"}
            className={`${hideUpdate ? "bg-black" : "bg-purpleDark"
              } p-2 px-6 mr-4 ml-auto text-white text-md rounded-lg `}
          >
            {hideUpdate ? "Create" : "Update"}
          </button>}
        </div>
      </form>
    </section>
  );
};

export default FormatData