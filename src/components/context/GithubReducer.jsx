const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.getUserPayload,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SEARCH_USERS":
      return {
        ...state,
        users: action.searchUserPayload,
        loading: false,
      };

    case "GET_USER":
      return {
        ...state,
        user: action.getSingleUserPayload,
        loading: false,
      };

    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };

    case "GET_USERREPOS":
      return {
        ...state,
        repos: action.getReposPayload,
      };
    default:
      return state;
  }
};

export default GithubReducer;
