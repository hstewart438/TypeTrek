import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // load user preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem("tt-theme");

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }

    // system preference default
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("tt-theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 18px",
        borderRadius: "999px",
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        color: "var(--text)",
        cursor: "pointer",
        fontSize: "0.9rem",
        zIndex: 1000,
      }}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
