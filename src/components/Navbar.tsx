import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="fixed w-full py-8 px-12 flex justify-between items-start z-1">
            <div className="nav-logo">
                <Link href={"/"} className="font-poppins font-semibold nav-a">
                    Morphix
                </Link>
            </div>

            <div className="nav-links flex gap-8">
                <Link href={"/docs"} className="nav-a">
                    Docs
                </Link>
                <Link href={"/upload"} className="nav-a">
                    Upload
                </Link>
                <Link href={"/about"} className="nav-a">
                    About
                </Link>
            </div>
            
        </nav>
    );
};

export default Navbar;
