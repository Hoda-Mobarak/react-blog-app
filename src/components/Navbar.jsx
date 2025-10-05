
import React, { useState, useContext } from "react";
import {
  Navbar as HeroUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { setIsLoggedIn, isLoggedIn, setUserData, userData } =
    useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }

  return (
  <HeroUi
  className="bg-pink-400 backdrop-blur-md text-sky-950 px-6 py-4 
             shadow-[0_4px_18px_rgba(0,0,0,0.2)] 
             sticky top-0 z-50 rounded-b-2xl"
  position="static"
>
      {/* Logo */}
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
            className="text-2xl bg-gradient-to-tr from-sky-600 to-pink-500 
                       w-10 h-10 flex items-center justify-center 
                       rounded-full text-white font-bold shadow-lg"
          >
            B
          </motion.span>
          <span className="tracking-wide text-xl font-semibold text-sky-950 drop-shadow-sm">
            Logify
          </span>
        </Link>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent justify="end" className="hidden md:flex gap-5">
        {isLoggedIn && userData ? (
          <>
            <NavbarItem>
              <span className="font-medium text-sky-900">
                Hi, <span className="font-bold">{userData.name}</span>
              </span>
            </NavbarItem>

            <NavbarItem>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-gradient-to-r 
                           from-pink-600 to-sky-600 text-white 
                           font-semibold shadow-lg hover:shadow-xl 
                           hover:scale-105 transition-all duration-200"
              >
                Logout
              </button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all duration-200 font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 to-pink-600 text-white shadow-md"
                      : "bg-white/80 text-sky-900 hover:bg-pink-100 hover:shadow-md"
                  }`
                }
              >
                Register
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all duration-200 font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 to-pink-600 text-white shadow-md"
                      : "bg-white/80 text-sky-900 hover:bg-sky-100 hover:shadow-md"
                  }`
                }
              >
                Login
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Toggle */}
      <NavbarMenuToggle
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden text-sky-900"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Mobile Menu */}
      <NavbarMenu className="bg-gradient-to-b from-[#b3e5fc] to-[#f8bbd0] text-sky-900 p-4 space-y-3 shadow-inner">
        {isLoggedIn && userData ? (
          <>
            <NavbarMenuItem>
              <span className="font-semibold">Hi {userData.name}</span>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <button
                onClick={handleLogout}
                className="px-4 py-2 w-full rounded-lg bg-gradient-to-r 
                           from-pink-600 to-sky-600 text-white font-semibold 
                           shadow-md hover:scale-105 transition"
              >
                Logout
              </button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <NavLink
                to="/register"
                className="block px-4 py-2 rounded-lg bg-white/90 text-sky-900 
                           hover:bg-pink-100 hover:shadow-md transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <NavLink
                to="/login"
                className="block px-4 py-2 rounded-lg bg-white/90 text-sky-900 
                           hover:bg-sky-100 hover:shadow-md transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroUi>
  );
}

