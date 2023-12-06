import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-5 flex-wrap shadow-md ">
      <div className="nav-main flex">
        <h3 className="mr-20 bold font-extrabold text-2xl">The BookMatcher</h3>
        <Link href="/" className="mr-10 mt-1">
          Home
        </Link>
        <Link href="/match" className="mt-1">
          Match
        </Link>
      </div>
      <div className="dark-mode">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
