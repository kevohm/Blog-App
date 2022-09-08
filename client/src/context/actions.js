const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

export const initialState = {
  msg: "",
  token: token,
  username: username,
  formData: [
    { name: "username", type: "text" },
    { name: "email", type: "email" },
    { name: "password", type: "password" },
  ],
  ShowError: false,
  success: false,
  userBlogs: [],
  singleBlog: [],
  isLoading: true,
  noOfPages: 1,
  noOfPagesAll: 1,
  allow:false,
};
export const actions = {
  REGISTER_USER: "REGISTER_USER",
  DISPLAY_ALERT: "DISPLAY_ALERT",
  LOGIN_USER: "LOGIN_USER",
  GET_BLOGS: "GET_BLOGS",
  GET_SINGLE_BLOG: "GET_SINGLE_BLOG",
  CLEAR_ALERT: "CLEAR_ALERT",
  LOGOUT_USER: "LOGOUT_USER",
  CREATE_BLOG: "CREATE_BLOG",
  UPDATE_BLOG: "UPDATE_BLOG",
  DELETE_BLOG: "DELETE_BLOG",
  SET_DEFAULTS:"SET_DEFAULTS"
};
