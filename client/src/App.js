import './App.css';

//components
import UserProfile from './components/userProfile';
import Navbar from './components/Navbar';

function App() {
  return ( 
    <>
      <Navbar/>
      <ul>
        <UserProfile/>
      </ul>
      <h1 className="text-3xl font-bold underline">
      Here is text where things can be added!
    </h1>
    </>
  );
}

export default App;
