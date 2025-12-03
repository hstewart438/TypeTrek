import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UseAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { user } = UseAuth();

  // 🔥 Disable backspace from going Back a page unless typing in input/textarea
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isTypingField =
        tag === "input" || tag === "textarea" || e.target.isContentEditable;

      if (!isTypingField && e.key === "Backspace") {
        e.preventDefault(); // stop browser navigation
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);


  return (
      <div className="min-h-screen font-mono bg-background text-foreground transition-colors">
        <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
