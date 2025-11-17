import Mountain from '../assets/mountain.svg';
import AccessButton from './AccessButton';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white">
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse mr-auto">
          <img
            src={Mountain}
            className="bg-[#edf0f7] relative w-12 h-12 rounded-full border border-black"
            alt="logo here not loaded"
          />
          <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            <Link to="/">TypeTrek</Link>
          </div>
        </div>
        <div className="ml-auto" id="navbar-default">
          <ul className="flex flex-row items-center justify-between w-full max-w-xl mx-auto space-x-4">
            <li>
              <Link className="text-black" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-black" to="/about">About</Link>
            </li>
            <li>
              <Link className="text-black" to="/lessons">Lessons</Link>
            </li>
            <li>
              <Link className="text-black" to="/profile">Profile</Link>
            </li>
            <li>
              <AccessButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;