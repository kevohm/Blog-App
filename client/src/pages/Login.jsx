import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useGlobally } from "../context/context";
import ErrorDisplay from "../components/ErrorDisplay";

const initialBody = {
  username: "",
  email: "",
  password: "",
  hasProfile: false,
};
export const Login = () => {
  const { username, formData, loginUser, registerUser } = useGlobally();
  const [body, setBody] = useState(initialBody);
  const data = body.hasProfile
    ? formData.filter((item) => item.name !== "username")
    : formData;
  const { hasProfile } = body;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = body;
    if (body.hasProfile) {
      loginUser({ email, password });
    } else {
      registerUser({ email, password, username });
    }
  };
  const handleChange = (data = {}) => {
    setBody({ ...body, ...data });
  };
  const handleClick = () => {
    handleChange({ hasProfile: !hasProfile });
  };
  useEffect(() => {
    if (username) {
      setTimeout(() => navigate("/blog"), 3000);
    }
  }, [username, navigate]);
  return (
      <section className="relative flex items-center px-2  justify-center w-screen h-screen bg-orangeLight dark:bg-black">
      <ErrorDisplay login={true}/>
        <div className="relative flex max-w-sm min-w-sm rounded-sm pt-10 pb-20 w-full flex-col bg-purpleDark drop-shadow-3xl dark:bg-blackLight">
          <form
            className="flex flex-col items-center w-full p-4 space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <header className="mx-auto text-center">
              <h1 className="text-xl mb-6 font-semibold">{`${
                hasProfile ? "Log in" : "Sign up"
              }`}</h1>
            </header>
            <Input data={data} body={body} handleChange={handleChange} />
            <div className="w-1/2 ">
              <input
                type="submit"
                value={`${hasProfile ? "Log in" : "Sign up"}`}
                className="text-white mb-1 w-full text-sm p-2 px-2 bg-black"
              />
            </div>
            <div className="absolute bottom-10 w-3/4 text-center">
              <p className="text-sm text-black mx-auto dark:text-black">
                {`${
                  hasProfile
                    ? "Don't have an account"
                    : "Already have an account"
                }`}

                <button
                  className="text-orangeLight pl-2 hover:underline dark:text-black dark:font-semibold"
                  onClick={() => handleClick()}
                >
                  {`${body.hasProfile ? "sign up" : "login"}`}
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
  );
};

export default Login;
