import { Outlet } from 'react-router-dom';
import { UseAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { user } = UseAuth();
  return (
      <div className="bg-gray-100 min-h-screen font-mono">
        <Navbar />
        <Outlet/>
      </div>
  );
}

export default App;