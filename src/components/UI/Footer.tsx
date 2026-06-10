import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="w-full  h-64 text-stone-500 text-xs py-12  border-t border-stone-900 bg-stone-950">
            <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row justify-between gap-y-10 md:gap-y-0 px-7">
                <div className="flex flex-col justify-between h-full gap-y-5">
                    <div>
                        <h2 className="text-lg md:text-2xl uppercase text-stone-200 tracking-wider">
                            Morphix
                        </h2>
                        <span className="text-xs text-stone-600 text-center tracking-tight">
                            Transform Content
                        </span>
                    </div>

                    <div className="space-y-1">
                        <span className="block text-sm text-stone-400 font-medium">
                            &copy; {new Date().getFullYear()} DC_PPL. All Rights
                            Reserved
                        </span>
                        <span className="block text-xs text-stone-600">
                            Made with ❤️ by{" "}
                            <Link
                                target="_blank"
                                href={"https://kushalpatel.me"}
                                className="cursor-pointer hover:underline"
                            >
                                Kushal Patel
                            </Link>
                        </span>
                    </div>
                </div>

                <nav className="flex flex-col gap-y-5 items-start md:items-end">
                    <h2 className="uppercase text-stone-200 text-lg font-semibold tracking-wide font-syne">
                        Pages
                    </h2>
                    <div className="flex flex-col gap-y-3 items-start md:items-center">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Docs", path: "/docs" },
                            { name: "Upload", path: "/upload" },
                            { name: "About", path: "/about" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-base font-light text-stone-400 hover:text-stone-100 transition-all duration-200 hover:underline"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </footer>
    );
};
