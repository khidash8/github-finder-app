import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItems from "./UserItems";
import GithubContext from "../context/GithubContext";

const UserResults = () => {
  const { users, loading } = useContext(GithubContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid-col-1 lg:grid-col-3 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {users.map((user) => (
        <div className="card bg-base-100 shadow-xl" key={user.id}>
          <UserItems user={user} />
        </div>
      ))}
    </div>
  );
};

export default UserResults;
