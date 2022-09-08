import React from "react";

const Input = ({ data, body, handleChange }) => {
  return data.map((item, index) => {
    return (
      <div className="w-1/2" key={index}>
        <input
          className={`w-full rounded-sm border text-sm
                   border-blackLight focus:border-black outline-none p-1 pl-2 `}
          type={item.type}
          name={item.name}
          value={body[item.name]}
          placeholder={item.name}
          onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
          required
        />
      </div>
    );
  });
};

export default Input;
