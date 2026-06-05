"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";

import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText, CustomEase);

const HomePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const preLoaderContainer = useRef<HTMLDivElement>(null);
    const preLoaderProgress = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    const counter = { value: 0 };

    useEffect(() => {
        if (!containerRef.current) return;

        CustomEase.create("hop", "0.9, 0, 0.1, 1");

        const splitText = (
            selector: string,
            type: "chars" | "words" | "lines",
            className: string,
        ) => {
            return new SplitText(selector, {
                type: type,
                [`${type}Class`]: className,
                mask: type,
            });
        };

        const headerSplit = splitText(".header h1", "chars", "char");
        const navSplit = splitText("nav .nav-a", "words", "word");

        const tl = gsap.timeline();

        tl.to(counter, {
            value: 100,
            duration: 3,
            ease: "power3.out",
            onUpdate: () => {
                if (preLoaderContainer) {
                    preLoaderProgress.current.textContent = Math.floor(
                        counter.value,
                    );
                }
            },
            onComplete: () => {
                const preLoaderSplit = splitText(
                    ".preloader-counter h1",
                    "chars",
                    "digit",
                );
                gsap.to(preLoaderSplit.chars, {
                    x: "-100%",
                    duration: 0.75,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 1,
                    onComplete: () => {
                        preLoaderContainer.current?.remove();
                    },
                });
            },
        });

        tl.to(
            preLoaderContainer.current,
            {
                scale: 1,
                duration: 3,
                ease: "power3.out",
            },
            "<",
        );

        tl.to(
            ".progress-bar",
            {
                scaleX: 1,
                duration: 3,
                ease: "power3.out",
            },
            "<",
        );

        tl.to(
            ".hero-bg",
            {
                clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
                duration: 1.5,
                ease: "hop",
            },
            4.5,
        );

        tl.to(
            ".hero-img",
            {
                scale: 1.5,
                duration: 1.5,
                ease: "hop",
                onComplete: () => {
                    progressBar.current?.remove();
                },
            },
            "<",
        );

        tl.to(
            ".hero-bg",
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 2,
                ease: "hop",
            },
            6,
        );

        tl.to(
            ".hero-img",
            {
                scale: 1,
                duration: 2,
                ease: "hop",
            },
            6,
        );

        tl.to(
            ".header h1 .char",
            {
                x: "0%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.075,
            },
            7,
        );

        tl.to(
            "nav .nav-a .word",
            {
                y: "0%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.075,
            },
            7.5,
        );

        return () => {
            headerSplit.revert();
            navSplit.revert();
        };
    }, []);

    return (
        <div
            className="w-screen min-h-screen overflow-x-hidden"
            ref={containerRef}
        >
            {/* Preloader counter: vertically centered left */}
            <div
                className="preloader-counter fixed top-1/2 left-8 -translate-y-1/2 scale-[0.25] origin-left will-change-transform z-2"
                ref={preLoaderContainer}
            >
                <h1 className="text-hero" ref={preLoaderProgress}>
                    0
                </h1>
            </div>

            {/* Navigation */}
            <nav className="fixed w-full py-8 px-12 flex justify-between items-start z-1">
                <div className="nav-logo">
                    <Link
                        href={"/"}
                        className="font-poppins font-semibold nav-a"
                    >
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

            {/* Hero Area */}
            <section className="hero relative w-full h-screen overflow-hidden">
                <div className="hero-bg absolute top-0 left-0 w-full h-full -z-1 select-none">
                    <Image
                        src={"/images/landing-page-bg.jpg"}
                        fill
                        alt="Landing page image"
                        /* Removed top-50% left-50% layout overrides; scaling up from the bottom center instead */
                        className="hero-img object-contain scale-200 object-bottom will-change-transform"
                        priority
                    />
                </div>

                {/* Header: fixed fraction to top-1/5 (20%) */}
                <div className="header font-syne leading-relaxed tracking-wider uppercase font-bold absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-8xl font-extrabold text-nowrap">
                        Morphix
                    </h1>
                </div>

                {/* Progress Bar: fixed calc space bug */}
                <div
                    className="progress-bar absolute left-8 bottom-24 w-[calc(100%-4rem)] h-1.5 bg-stone-100/20 origin-left scale-x-0 will-change-transform overflow-hidden rounded-xl"
                    ref={progressBar}
                >
                    <div className="progress absolute w-full h-full bg-stone-100 origin-left scale-x-0"></div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
