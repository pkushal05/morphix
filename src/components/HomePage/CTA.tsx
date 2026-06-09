import { useRef } from "react";
import { TransformAnimation } from "./TransformAnimation";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export const CTA = () => {
    const router = useRouter();
    const headingRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const titleSplit = new SplitText(headingRef.current, {
            type: "words",
            mask: "words",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(titleSplit.words, {
            y: 20,
            rotation: -5,
            filter: "blur(10px)",
            opacity: 0,
            stagger: 0.08,
            duration: 1.4,
            ease: "power4.out",
        });
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full py-primary flex flex-col items-center px-7 border-t border-stone-800 relative"
        >
            <div className="max-w-5xl w-full flex flex-col items-center">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-6 mt-4">
                    DC_PPL.CORE_INFRASTRUCTURE
                </span>
                <h2
                    ref={headingRef}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne uppercase tracking-tight leading-[0.95] text-stone-100 text-center mb-10 md:mb-0"
                >
                    Engineered for Ease of Student Web Devs.
                </h2>
            </div>
            <TransformAnimation router={router} />
        </section>
    );
};
