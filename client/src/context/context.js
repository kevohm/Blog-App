import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { actions, initialState } from "./actions";
const axios = require("axios").default;

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //default
  axios.defaults.baseURL = "https://tyrantx-blog-app.herokuapp.com/v1/";
  // axios.defaults.withCredentials = true
  //interceptors
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        LogoutUser();
      }
      return Promise.reject(error);
    }
  );
  const addUserToLocalStorage = ({ username, token }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };
  const displayAlert = (msg = null, success = false, showErr = true) => {
    dispatch({
      type: actions.DISPLAY_ALERT,
      payload: { msg, success, showErr },
    });
    clearAlert();
  };
  const setToDefaults = () => {
    dispatch({
      type: actions.SET_DEFAULTS,
      payload: { isLoading: true, ShowError: false },
    });
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: actions.CLEAR_ALERT });
    }, 3000);
  };
  const registerUser = async (body) => {
    setToDefaults();
    let result = { msg: "", success: true };
    try {
      const { data } = await axios.post("auth", body);
      result.msg = data.msg;
    } catch (err) {
      result.success = false;
      result.msg = err.response.data.msg;
    }
    dispatch({ type: actions.REGISTER_USER, payload: { result } });
    displayAlert();
  };
  const LogoutUser = () => {
    setToDefaults();
    dispatch({
      type: actions.LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };
  const loginUser = async (body) => {
    setToDefaults();
    removeUserFromLocalStorage();
    let result = {
      msg: "",
      success: false,
      username: "",
      token: "",
    };
    try {
      const { data } = await axios.post("auth/login", body, {});
      const { msg, username, token } = data;

      result.msg = msg;
      result.success = true;
      result.username = username;
      result.token = token;
      addUserToLocalStorage({ token, username });
    } catch (err) {
      result.msg = err.response.data.msg;
    }
    dispatch({
      type: actions.LOGIN_USER,
      payload: { result },
    });
    displayAlert();
  };

  const getBlogs = async (page = 1, username = "all") => {
    setToDefaults();
    let result = {
      userBlogs: [],
      msg: "",
      noOfPages: 1,
      noOfPagesAll: 1,
      allow: false,
    };
    try {
      const { data } = await axios.get(
        `blog?username=${username}&page=${page}`
      );
      result.userBlogs = data.blogs;
      result.noOfPages = data.noOfPages;
      result.allow = data.allow;
    } catch (err) {
      result.msg = checkErr(err);
    }
    dispatch({
      type: actions.GET_BLOGS,
      payload: { result },
    });
    if (result.msg !== "") {
      displayAlert(result.msg, false);
    }
  };
  const getSingle = async (id) => {
    setToDefaults();
    let result = {
      singleBlog: {},
    };
    try {
      const { data } = await axios.get(`blog/${id}`);
      data.updatedAt = new Date(data.updatedAt).toLocaleString().split(",");
      result.singleBlog = data;
    } catch (err) {
      result.msg = err.response.data.msg;
    }
    dispatch({
      type: actions.GET_SINGLE_BLOG,
      payload: { result },
    });
  };
  const createBlog = async (body) => {
    setToDefaults();
    const result = {
      success: false,
      msg: "",
    };
    try {
      const { data } = await axios.post("blog", body);
      result.msg = data.msg;
      result.success = true;
    } catch (err) {
      result.msg = err.response.data.msg;
    }
    dispatch({
      type: actions.CREATE_BLOG,
      payload: { result },
    });
    displayAlert();
  };
  const checkErr = (err) => {
    let message;
    if (err.response.data) {
      const { msg } = err.response.data;
      if (msg) {
        message = msg;
      } else {
        message = "Check your internet connection";
      }
    } else if (err.request.data) {
      const { msg } = err.request.data;
      message = msg ? err.request.data.msg.message : msg;
    } else {
      console.log(message);

      message = err.message;
    }
    //console.log(message);
    return message;
  };
  const updateBlog = async (body, id) => {
    setToDefaults();
    const result = {
      success: false,
      msg: "",
    };
    try {
      const { data } = await axios.patch(`blog/${id}`, body);
      result.msg = data.msg;
      result.success = true;
    } catch (err) {
      result.msg = err.response.data.msg;
    }
    dispatch({
      type: actions.UPDATE_BLOG,
      payload: { result },
    });
    displayAlert();
  };
  const deleteBlog = async (id) => {
    setToDefaults();
    const result = {
      success: false,
      msg: "",
    };
    try {
      const { data } = await axios.delete(`blog/${id}`);
      result.msg = data.msg;
      result.success = true;
    } catch (err) {
      result.msg = err.response.data.msg;
    }
    dispatch({
      type: actions.DELETE_BLOG,
      payload: { result },
    });
    displayAlert();
  };
  const toggleError = () => {
    dispatch({
      type: actions.SHOW_ERROR,
      payload: { showError: !state.ShowError },
    });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        LogoutUser,
        loginUser,
        registerUser,
        toggleError,
        displayAlert,
        getBlogs,
        getSingle,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobally = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobally };
