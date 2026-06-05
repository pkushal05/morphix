import Link from "next/link";

const Navbar = () => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/docs", label: "Docs" },
        { href: "/upload", label: "Upload" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="fixed w-full py-8 px-12 flex justify-between items-start text-stone-100 z-5">
            <div className="nav-logo">
                <Link href={"/"} className="font-poppins text-2xl nav-a">
                    <div className="">Morphix</div>
                </Link>
            </div>

            <div className="nav-links flex gap-8 uppercase font-medium tracking-wider text-base">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group relative block h-[20px] overflow-hidden leading-[20px] nav-a"
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
        </nav>
    );
};

export default Navbar;
