import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Problems = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    useGSAP(() => {
        if (!containerRef.current) return;
        const headingSplit = new SplitText(titleRef.current, {
            type: "lines, words",
            mask: "words",
        });

        const descSplit = new SplitText(descRef.current, {
            type: "lines",
            mask: "lines",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 65%",
                toggleActions: "play reverse play reverse",
                end: "bottom 20%",
            },
        });

        tl.from(headingSplit.words, {
            y: 30,
            rotation: -5,
            filter: "blur(10px)",
            opacity: 0,
            stagger: 0.08,
            duration: 1.4,
            ease: "power4.out",
        });

        tl.from(
            descSplit.lines,
            {
                x: 20,
                stagger: 0.08,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            },
            "<",
        );

        tl.from(
            cardsRef.current,
            {
                x: "random(-50, 50)",
                y: "random(-50, 50)",
                opacity: 0,
                duration: 1.9,
                ease: "power4.out",
            },
            0.8,
        );

        return () => {
            {
                headingSplit.revert();
                descSplit.revert();
            }
        };
    }, [containerRef]);

    return (
        <div
            ref={containerRef}
            className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start px-7"
        >
            {/* Massive Headline Left */}
            <div className="lg:col-span-6 problem-text">
                <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-4">
                    The Pain Point
                </span>
                <h2
                    ref={titleRef}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne uppercase tracking-tight leading-[0.95] text-stone-100"
                >
                    Stop wrestling <br />
                    with layout code. <br />
                    <span className="text-stone-500">
                        Start shipping curriculum.
                    </span>
                </h2>
                <p
                    ref={descRef}
                    className="mt-6 text-stone-400 text-sm md:text-base max-w-md font-medium leading-relaxed"
                >
                    Manual formatting is a developmental bottleneck. Morphix
                    tears down the overhead so you can focus entirely on
                    structural content design.
                </p>
            </div>

            {/* Staggered Card Grid Right */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt- lg:pt-0">
                {/* Card 1 */}
                <div
                    ref={(el) => {
                        if (el) cardsRef.current[0] = el;
                    }}
                    className="problem-card bg-stone-900/40 border border-stone-800 p-8 rounded-xl flex flex-col justify-between min-h-50 hover:border-stone-700 transition-colors duration-300 md:translate-y-8"
                >
                    <div className="font-mono text-xs text-stone-600 font-bold">
                        CRITICAL_ERROR_01
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold font-syne uppercase tracking-wide mb-3 text-stone-200">
                            Inconsistent Styling
                        </h3>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Copy-pasting from Word completely destroys your DOM
                            layout architecture. Headings break, lists misalign,
                            and your responsive structural flow utterly
                            shatters.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    ref={(el) => {
                        if (el) cardsRef.current[1] = el;
                    }}
                    className="problem-card bg-stone-900/40 border border-stone-800 p-8 rounded-xl flex flex-col justify-between min-h-50 hover:border-stone-700 transition-colors duration-300 "
                >
                    <div className="font-mono text-xs text-stone-600 font-bold">
                        TIME_WASTE_02
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold font-syne uppercase tracking-wide mb-3 text-stone-200">
                            Wasted Dev Hours
                        </h3>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Your engineering cycles are too valuable to spend
                            manually writing nested wrapper{" "}
                            <code className="text-stone-300 bg-stone-800/50 px-1.5 py-0.5 rounded text-xs font-mono">
                                &lt;div&gt;
                            </code>{" "}
                            tags and tracking inline alignment adjustments just
                            to get a training syllabus live.
                        </p>
                    </div>
                </div>

                {/* Card 3 - Spans across or sits asymmetric */}
                <div
                    ref={(el) => {
                        if (el) cardsRef.current[2] = el;
                    }}
                    className="problem-card bg-stone-900/40 border border-stone-800 p-8 rounded-xl flex flex-col justify-between min-h-50 hover:border-stone-700 transition-colors duration-300 md:col-span-2 md:max-w-[85%] mt-0 md:mt-6 md:translate-x-24"
                >
                    <div className="font-mono text-xs text-stone-600 font-bold">
                        DATA_CHAOS_03
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold font-syne uppercase tracking-wide mb-3 text-stone-200">
                            Broken Data Structures
                        </h3>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Without a strict parsing engine pattern, layout
                            assets become an unsearchable, unstructured black
                            box. You lose type safety, modular component
                            mapping, and long-term content scalability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
