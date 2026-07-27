import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileText, LogOut, Menu, User, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-slate-900">Hirelytics</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {!isLoggedIn &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600"
              >
                {link.name}
              </a>
            ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" icon={User}>
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" icon={LogOut} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login-choice">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-slate-700" />
          ) : (
            <Menu className="h-6 w-6 text-slate-700" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-custom flex flex-col gap-3 py-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login-choice" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
