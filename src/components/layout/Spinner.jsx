import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <img className="w-24" src={spinner} alt="loading . . . " />
    </div>
  );
};

export default Spinner;
