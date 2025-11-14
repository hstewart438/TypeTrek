
import Mountain from '../assets/mountain.svg';
import AuthButton from './AuthButton';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="bg-blue-600">
        <div className="flex flex-wrap items-center justify-between p-4">
       
          <div className="flex items-center space-x-4 rtl:space-x-reverse mr-auto">
            <img
              src={Mountain}
              className="bg-[#edf0f7] relative w-12 h-12 rounded-full border border-black"
              alt="logo here not loaded"
            />
            <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <Link to="/">TypeTrek</Link>
            </div>
          </div>

          <div className="ml-auto" id="navbar-default">
            <ul className="font-medium flex flex-row items-center space-x-4">
              <li>
                <div className="block text-white" aria-current="page">
                  <Link to="/">Home</Link>
                </div>
              </li>
              <li>
                <div className="block text-white" aria-current="page">
                  <Link to="/about">About</Link>
                </div>
              </li>
              <li>
                <div className="block text-white" aria-current="page">
                  <Link to="/lessons">Lessons</Link>
                </div>
              </li>
              <li>
                <div className="block text-white" aria-current="page">
                  <Link to="/profile">Profile</Link>
                </div>
              </li>
              <li>
                <div className="block text-white" aria-current="page">
        
                    <AuthButton />
           
                </div>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;