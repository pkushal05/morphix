"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { PIPELINESTEPS } from "@/lib/data";

export const Solution = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const titleSplit = new SplitText(headingRef.current, {
                type: "lines",
                mask: "lines",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(titleSplit.lines, {
                y: 20,
                rotation: -5,
                filter: "blur(10px)",
                opacity: 0,
                stagger: 0.08,
                duration: 1.4,
                ease: "power4.out",
            });

            tl.from(
                cardsRef.current,
                {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.25,
                    ease: "power4.out",
                },
                "<",
            );

            const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
            const targetWord = "CHAOS";
            const chaosEl = document.querySelector(".chaos-word");

            const scrambleTimeline = gsap.timeline({
                repeat: -1,
                repeatDelay: 1.5,
            });

            scrambleTimeline

                .to(
                    {},
                    {
                        duration: 1,
                        onUpdate: function () {
                            let scrambled = "";
                            for (let i = 0; i < targetWord.length; i++) {
                                scrambled +=
                                    chars[
                                        Math.floor(Math.random() * chars.length)
                                    ];
                            }
                            if (chaosEl) chaosEl.textContent = scrambled;
                        },
                    },
                )

                .to(
                    {},
                    {
                        duration: 0.1,
                        onStart: () => {
                            if (chaosEl) chaosEl.textContent = targetWord;
                        },
                    },
                );

            const safeTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

            safeTl

                .fromTo(
                    ".safe-left-bracket",
                    { x: -15, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
                )
                .fromTo(
                    ".safe-right-bracket",
                    { x: 15, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
                    "<",
                )

                .to({}, { duration: 2 })

                .to([".safe-left-bracket", ".safe-right-bracket"], {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });

            return () => titleSplit.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen py-primary flex flex-col justify-center items-center px-7 border-t border-stone-800"
        >
            <div className="max-w-7xl w-full">
                {/* Header Context */}
                <div className="mb-20 text-right flex flex-col items-end">
                    <span className="font-mono text-xs uppercase tracking-widest text-green block mb-4">
                        02 . THE PIPELINE
                    </span>
                    <h2
                        ref={headingRef}
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne uppercase tracking-tight text-stone-100 leading-[0.95]"
                    >
                        Document{" "}
                        <span className="chaos-word block md:inline-block font-mono min-w-[5ch] text-stone-400">
                            CHAOS
                        </span>
                        <span className="block">To Type-</span>
                        <span className="safe-container inline-flex items-center relative text-green">
                            <span className="safe-left-bracket inline-block will-change-transform opacity-0 font-mono text-emerald-600/60 pr-1">
                                &lt;
                            </span>
                            <span>SAFE </span>
                            <span className="safe-right-bracket inline-block will-change-transform opacity-0 font-mono text-emerald-600/60 pl-1">
                                /&gt;
                            </span>
                        </span>
                        <br />
                        Architecture
                    </h2>
                </div>

                {/* Pipeline Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {PIPELINESTEPS.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="bg-stone-900/20 border border-stone-800/80 p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-stone-700 transition-colors duration-300 min-h-60"
                        >
                            {/* Accent blur on hover */}
                            <div className="absolute -right-12 -top-12 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full group-hover:bg-emerald-500/10 transition-all duration-500" />

                            <div>
                                <div className="flex justify-between items-center mb-7">
                                    <span className="font-mono text-2xl font-bold text-stone-700 group-hover:text-green transition-colors duration-300">
                                        {item.step}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 border border-stone-800 px-2.5 py-1 rounded bg-stone-950">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold font-syne uppercase tracking-wide mb-4 text-stone-200">
                                    {item.title}
                                </h3>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
