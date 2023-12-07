"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

const Nav = () => {
  const currentRoute = usePathname();

  // styles for all links
  const linkStyle = "mr-10 mt-1";

  // styles for active and non-active links
  const activeStyle = linkStyle + " text-red-500";
  const nonActiveStyle = linkStyle;

  return (
    <nav className="flex items-center justify-between p-5 flex-wrap shadow-md">
      <div className="nav-main flex">
        <h3 className="mr-20 bold font-extrabold text-2xl">The BookMatcher</h3>
        <Link
          href="/"
          className={currentRoute === "/" ? activeStyle : nonActiveStyle}
        >
          Home
        </Link>
        <Link
          href="/admin"
          className={currentRoute === "/admin" ? activeStyle : nonActiveStyle}
        >
          Admin Panel
        </Link>
      </div>
      <div className="dark-mode ">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
