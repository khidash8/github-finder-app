import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItems from "./UserItems";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://api.github.com/users`, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        },
      });

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

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
