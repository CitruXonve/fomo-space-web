import { Link } from "react-router-dom";

const NavHeader = () => {
  const navItemClasses = "text-sm font-semibold dark:text-white mx-4 my-2";
  return (
    <>
      <div
        id="app-header"
        className="flex flex-row justify-between items-center bg-white/80 dark:bg-tertiary/60 sticky top-0 z-10 backdrop-blur-sm"
        style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-row justify-start items-center">
          <span className="text-2xl font-bold dark:text-white mx-4 my-4 select-none"></span>
          <h1 className="text-xl font-bold dark:text-white mx-4 my-4 select-none">
            FomoSpace.me
          </h1>
        </div>
        <div className="flex flex-row justify-end items-center">
          <span
            className="p-2 mr-4 rounded cursor-pointer text-shadow-xl hover:glow-effect-primary"
            aria-label="Open main menu"
          >
            <svg
              className="h-7 w-7 text-gray-800 dark:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </span>
        </div>
      </div>
      <nav
        id="main-menu"
        className="flex flex-col justify-end text-right dark:text-white box-shadow-md dark:border-gray-700"
      >
        <Link to="#" className={navItemClasses}>
          React
        </Link>
        <Link to="#" className={navItemClasses}>
          Vite
        </Link>
        <Link to="#" className={navItemClasses}>
          Tailwind CSS
        </Link>
      </nav>
    </>
  );
};

export default NavHeader;
