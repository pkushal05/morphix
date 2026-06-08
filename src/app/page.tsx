"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrollBadge from "@/components/HomePage/ScrollBadge";
import { Problems } from "@/components/HomePage/Problems";

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

const INTRO_KEY = "intro_seen";

const HomePage = () => {
    const preLoaderContainer = useRef<HTMLDivElement>(null);
    const preLoaderProgress = useRef<HTMLDivElement>(null);
    const preLoaderParent = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const hasSeenIntro = sessionStorage.getItem(INTRO_KEY) === "1";

        if (hasSeenIntro) {
            gsap.set(preLoaderParent.current, { display: "none" });
            return;
        }

        CustomEase.create("hop", "0.9, 0, 0.1, 1");

        const splitText = (
            selector: string,
            type: "chars" | "words" | "lines",
            className: string,
        ) => {
            return new SplitText(selector, {
                type,
                [`${type}Class`]: className,
                mask: type,
            });
        };

        const counter = { value: 0 };
        const headerSplit = splitText(".header h1", "chars", "char");
        const headerPSplit = splitText(".header p", "words", "word");
        const navSplit = splitText("nav .nav-a", "words", "word");

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem(INTRO_KEY, "1");
            },
        });

        tl.to(counter, {
            value: 100,
            duration: 3,
            ease: "power3.out",
            onStart: () => {
                if (preLoaderParent.current?.style.display === "none") {
                    preLoaderParent.current.style.display = "block";
                }
            },
            onUpdate: () => {
                if (preLoaderContainer.current && preLoaderProgress.current) {
                    preLoaderProgress.current.textContent = `${Math.floor(counter.value)}`;
                }
                gsap.to(preLoaderContainer.current, {
                    opacity: 100,
                    duration: 3,
                });
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
                    opacity: 0,
                    onComplete: () => {
                        preLoaderContainer.current?.remove();
                        gsap.set(preLoaderParent.current, { display: "none" });
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
                onComplete: () => {
                    progressBar.current?.remove();
                },
            },
            "<",
        );

        tl.fromTo(
            ".hero-bg",
            {
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                opacity: 0,
            },
            {
                clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
                opacity: 1,
                duration: 1.5,
                ease: "hop",
            },
            4.5,
        );

        tl.fromTo(
            ".hero-img",
            { scale: 5 },
            {
                scale: 1.5,
                duration: 1.5,
                ease: "hop",
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

        tl.from(
            headerSplit.chars,
            {
                x: "100%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.075,
            },
            7,
        );

        tl.from(
            headerPSplit.words,
            {
                y: "100%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.075,
            },
            "<",
        );

        tl.from(
            navSplit.words,
            {
                y: "100%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.075,
            },
            "<",
        );

        tl.fromTo(
            badgeRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 100,
                duration: 1,
            },
            "<",
        );

        return () => {
            tl.kill();
            headerSplit.revert();
            navSplit.revert();
        };
    }, []);

    useGSAP(() => {
        gsap.to(badgeRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);

    return (
        <div className="w-screen min-h-screen">
            {/* Preloader counter*/}
            <div
                className="preloader-parent fixed inset-0 w-full h-full bg-black z-50"
                ref={preLoaderParent}
            >
                <div
                    className="preloader-counter fixed top-1/2 left-8 -translate-y-1/2 scale-[0.25] origin-left will-change-transform opacity-0"
                    ref={preLoaderContainer}
                >
                    <h1 className="text-hero" ref={preLoaderProgress}>
                        0
                    </h1>
                </div>
                {/* Progress Bar */}
                <div
                    className="progress-bar fixed left-8 bottom-20 w-[calc(100%-4rem)] h-1 bg-stone-400 origin-left scale-x-0 will-change-transform overflow-hidden rounded-xl"
                    ref={progressBar}
                ></div>
            </div>
            {/* Hero Section  */}
            <section className="relative">
                {/* Hero Area */}
                <section className="hero relative w-full h-screen overflow-hidden">
                    <div className="hero-bg absolute top-0 left-0 w-full h-full -z-1 select-none">
                        <Image
                            src={"/images/landing-page-bg.jpg"}
                            fill
                            alt="Landing page image"
                            className="hero-img object-contain object-bottom will-change-transform"
                            priority
                        />
                    </div>

                    {/* Header */}
                    <div className="header absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold text-nowrap font-syne tracking-wider uppercase">
                            Morphix
                        </h1>
                        <p className="text-center text-sm md:text-lg text-stone-400 ">
                            Transform Content
                        </p>
                    </div>
                </section>

                <div ref={badgeRef}>
                    <ScrollBadge />
                </div>
            </section>
            {/* 2. THE PROBLEM SECTION */}
            <section
                ref={containerRef}
                className="min-h-screen my-primary bg-stone-950 text-stone-100 py-6 md:py-3 flex flex-col justify-center border-t border-b border-stone-800"
            >
                <Problems />
            </section>

            <section className="h-screen"></section>
        </div>
    );
};

export default HomePage;
