import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 h-[120px] border-b">
      <Link to={"/"} className="flex items-center">
        <img src={"/movie_logo.png"} width={80} />
        <span className="font-bold ps-5 text-2xl max-sm:hidden">Moviemania</span>
      </Link>

      <Link to={'/create'} className="border rounded-full p-1 px-5 transition hover:bg-black hover:text-white">
        Add movie
      </Link>
    </header>
  );
};

export default Header;
