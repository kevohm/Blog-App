import { actions } from "./actions"

export const reducer = (state, action) => {
  if (action.type === actions.DISPLAY_ALERT) {
    const { msg, success } = action.payload;

    return msg ? {
          ...state,
          ShowError:true,
          success,
          msg,
        }:{...state,ShowError:true}
  }
  if (action.type === actions.CLEAR_ALERT) {
    return {
      ...state,
      ShowError: false,
    };
  }
  if (action.type === actions.REGISTER_USER) {
    const { msg, success } = action.payload.result;
    return {
      ...state,
      msg,
      success,
    };
  }
  if (action.type === actions.LOGIN_USER) {
    const { msg, success, token, username } = action.payload.result;
    return { ...state, msg, success, token, username };
  } if (action.type === actions.LOGOUT_USER) {
    return {
      ...state,
      msg: `${state.username} Logged out`,
      success: true,
      token: '',
      username: ''
    };
  }
  if (action.type === actions.SHOW_ERROR) {
    return {
      ...state,
      ShowError: action.payload.showError,
    };
  }
  if (action.type === actions.SET_DEFAULTS) {
    const { isLoading,ShowError } = action.payload;
    return {
      ...state,
      isLoading,
      ShowError,
    };
  }
  if (action.type === actions.GET_BLOGS) {
    const { userBlogs, noOfPages,allow } = action.payload.result;
    return {
      ...state,
      userBlogs,
      noOfPages,
      isLoading: false,
      allow
    };
  }
  if (action.type === actions.GET_SINGLE_BLOG) {
    return {
      ...state,
      singleBlog: action.payload.result.singleBlog,
      isLoading: false,
    };
  }
  if (
    action.type === actions.CREATE_BLOG ||
    action.type === actions.UPDATE_BLOG ||
    action.type === actions.DELETE_BLOG
  ) {
    const { msg, success } = action.payload.result;
    return {
      ...state,
      msg,
      success,
    };
  }
    return state;
}
