import { useContext, useState } from "react";
import GithubContext from "../context/GithubContext";
import AlertContext from "../context/Alert/AlertContext";

const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      setText("");
      searchUsers(text);
    }
  };

  const handleChange = (e) => setText(e.target.value);
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="input input-lg w-full bg-gray-200 pr-40 text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-lg absolute right-0 top-0 w-36 rounded-l-none"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users?.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
