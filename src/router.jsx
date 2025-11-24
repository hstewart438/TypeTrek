import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from './pages/Home';
import About from './pages/About';
import Lessons from './pages/Lessons';
import Profile from './pages/Profile';
import NotFound from "./pages/NotFound";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    { path: "/", element: <Home /> }, // renders at "/"
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/lessons", element: <PrivateRoute><Lessons/></PrivateRoute>},
    {path: "/profile", element: <PrivateRoute><Profile/></PrivateRoute>},
    {path: "/signup", element: <Signup/>},
    {path: "/login", element: <Login/>},
    {path: "*", element: <NotFound/>},
    ],
  },
]);