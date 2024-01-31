import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

const Home = () => {
  return (
    <div className="text-center text-2xl uppercase">
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default Home;
