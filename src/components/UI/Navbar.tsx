"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const navLinksRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const links = [
        { href: "/", label: "Home" },
        { href: "/docs", label: "Docs" },
        { href: "/upload", label: "Upload" },
        { href: "/about", label: "About" },
    ];

    useGSAP(() => {
        tl.current = gsap
            .timeline({ paused: true })
            .to(navRef.current, {
                right: "0%",
                duration: 0.4,
                borderRadius: "0px",
                ease: "circ.out",
            })
            .fromTo(
                navLinksRef.current?.children || [],
                { x: 20, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.2 },
                "-=0.1",
            )
            .from(".close-menu", {
                opacity: 0,
                duration: 0.2,
            });
    }, []);

    useEffect(() => {
        if (!tl.current) return;
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);

    return (
        <>
            <nav className="fixed inset-x-0 top-0 w-full max-w-7xl mx-auto py-5 px-7 flex justify-between items-center text-stone-100 z-50 backdrop-blur-[3px]">
                <div className="nav-logo" onClick={() => setIsOpen(false)}>
                    <Link
                        href={"/"}
                        className="font-poppins text-lg md:text-2xl nav-a"
                    >
                        <div className="">Morphix</div>
                    </Link>
                </div>

                <div className="nav-links hidden lg:flex gap-8 uppercase font-medium tracking-wider text-base">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative block h-5 overflow-hidden leading-5 nav-a"
                        >
                            <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                {link.label}
                            </div>

                            <div className="absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-stone-400">
                                {link.label}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="lg:hidden overflow-hidden inline-block dynamic-height-alignment">
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`open-menu cursor-pointer block ${isOpen && "hidden"}`}
                        aria-label="Open menu"
                    >
                        <CgMenuRight size={20} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu  */}
            <div
                ref={navRef}
                className="navref fixed top-0 -right-1/2 h-screen w-1/2 z-50 p-6"
                style={{
                    borderRadius: "50%",
                    pointerEvents: isOpen ? "auto" : "none",
                }}
            >
                <div className="absolute inset-0 backdrop-blur-xs" />
                <button
                    onClick={() => setIsOpen(false)}
                    className="close-menu absolute top-6 right-5 cursor-pointer"
                    aria-label="Close menu"
                >
                    <IoMdClose size={20} />
                </button>

                <div
                    ref={navLinksRef}
                    className="h-full flex flex-col gap-y-10 py-64 items-start"
                >
                    <Link
                        href={"/"}
                        className="mobile-link text-xl md:text-2xl hover:underline hover:text-stone-400 transition-all duration-150 ease-in"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href={"/docs"}
                        className="mobile-link text-xl md:text-2xl hover:underline hover:text-stone-400 transition-all duration-150 ease-in"
                        onClick={() => setIsOpen(false)}
                    >
                        Docs
                    </Link>
                    <Link
                        href={"/upload"}
                        className="mobile-link text-xl md:text-2xl hover:underline hover:text-stone-400 transition-all duration-150 ease-in"
                        onClick={() => setIsOpen(false)}
                    >
                        Upload
                    </Link>
                    <Link
                        href={"/about"}
                        className="mobile-link text-xl md:text-2xl hover:underline hover:text-stone-400 transition-all duration-150 ease-in"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
