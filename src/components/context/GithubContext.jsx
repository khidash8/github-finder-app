import { createContext, useCallback, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import GithubReducer from "./GithubReducer";

// Create a new context for managing GitHub-related data
const GithubContext = createContext();

// Define a provider component that will provide the GitHub context to its children
export const GithubProvider = ({ children }) => {
  // Initialize the state for users and loading status
  const initialState = {
    users: [], // An empty array to store user data
    loading: false, // A boolean to indicate if data is currently loading
    user: {}, // An empty object to store user data
    repos: [], // An empty array to store repository data
  };

  // Use the useReducer hook to manage state and actions related to GitHub data
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Define a function to fetch user data from the GitHub API
  // ***this code is purely for testing purpouses***
  const fetchUsers = useCallback(async () => {
    setLoading();
    try {
      // Make a GET request to the GitHub API to fetch user data
      const response = await fetch(`https://api.github.com/users`, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        },
      });

      // Extract the JSON data from the response
      const data = await response.json();

      // Dispatch an action to update the state with the fetched user data
      dispatch({
        type: "GET_USERS",
        getUserPayload: data,
      });
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch operation
      return error; // Return the error for handling in the application
    }
  }, []);

  // Define a function to search for users in the GitHub API
  const searchUsers = useCallback(async (text) => {
    setLoading();

    try {
      // Make a GET request to the GitHub API to fetch user data
      const response = await fetch(
        `https://api.github.com/search/users?q=${text}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
          },
        },
      );

      // Extract the JSON data from the response
      const { items } = await response.json();

      // Dispatch an action to update the state with the fetched user data
      dispatch({
        type: "SEARCH_USERS",
        searchUserPayload: items,
      });
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch operation
      return error; // Return the error for handling in the application
    }
  }, []);

  // Define a function to get a single user from the GitHub API
  const getSingleUser = useCallback(async (login) => {
    setLoading();

    try {
      // Make a GET request to the GitHub API to fetch user data
      const response = await fetch(`https://api.github.com/users/${login}`, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        window.location = "/notfound";
        throw new Error("Failed to fetch user data");
      } else {
        // Extract the JSON data from the response
        const data = await response.json();

        // Dispatch an action to update the state with the fetched user data
        dispatch({
          type: "GET_USER",
          getSingleUserPayload: data,
        });
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch operation
      return error; // Return the error for handling in the application
    }
  }, []);

  // Define a function to get user repositories from the GitHub API
  const getUserRepos = useCallback(async (login) => {
    setLoading();

    try {
      // Make a GET request to the GitHub API to fetch user data
      const response = await fetch(
        `https://api.github.com/users/${login}/repos?per_page=10&sort=created:asc`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
          },
        },
      );

      // Extract the JSON data from the response
      const data = await response.json();

      // Dispatch an action to update the state with the fetched user data
      dispatch({
        type: "GET_USERREPOS",
        getReposPayload: data,
      });
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch operation
      return error; // Return the error for handling in the application
    }
  }, []);

  // Define a function to clear the search results
  const clearUsers = useCallback(() => dispatch({ type: "CLEAR_USERS" }), []);

  // Define a function to set the loading status
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Memoize the context value to optimize performance
  const contextValue = useMemo(
    () => ({
      users: state.users, // Provide the users array from the state
      user: state.user, // Provide the user object from the state
      repos: state.repos, // Provide the repos array from the state
      loading: state.loading, // Provide the loading status from the state
      getUserRepos, // Provide the getUserRepos function
      fetchUsers, // Provide the fetchUsers function (testing purposes only)
      searchUsers, // Provide the searchUsers function
      clearUsers, // Provide the clearUsers function
      getSingleUser, // Provide the getSingleUser function
    }),
    [
      state.users,
      state.loading,
      fetchUsers,
      searchUsers,
      clearUsers,
      state.user,
      getSingleUser,
      state.repos,
      getUserRepos,
    ],
  );

  // Return the GitHub context provider with the context value and nested children
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

GithubProvider.propTypes = {
  children: PropTypes.node,
};

GithubProvider.defaultProps = {
  children: null,
};
