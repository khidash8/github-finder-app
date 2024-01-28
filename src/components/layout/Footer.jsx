import { GiMonkey } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral p-5 text-neutral-content">
      <div>
        <GiMonkey className="inline pr-2 text-3xl" />
        <span className="font-bold">
          DevApe&copy; 2024 - All right reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
