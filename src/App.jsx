import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import "./styles/index.css"

export default function App() {
  return (
     <>
      <Navbar/>
      <Outlet/>
    </>
  );
}
