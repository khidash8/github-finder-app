import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img className="w-24" src={spinner} alt="loading . . . " />
      <h2 className="text-3xl font-bold">Loading . . . </h2>
    </div>
  );
};

export default Spinner;
