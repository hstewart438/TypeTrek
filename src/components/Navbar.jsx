import { Link } from 'react-router-dom';

import Mountain from '../assets/mountain.svg';
import AccessButton from './access/AccessButton';
import AdminAccess from './access/AdminAccess';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse mr-auto">
          <img
            src={Mountain}
            className="logo-circle relative w-12 h-12 rounded-full"
            alt="logo here not loaded"
          />
          <div className="self-center text-2xl font-semibold whitespace-nowrap">
            <Link to="/">TypeTrek</Link>
          </div>
        </div>
        <div className="ml-auto" id="navbar-default">
          <ul className="flex flex-row items-center justify-between w-full max-w-xl mx-auto space-x-4">
            <li>
              <AdminAccess/>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/lessons">Lessons</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
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
