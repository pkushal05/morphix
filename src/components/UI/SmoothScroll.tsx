"use client";

import { useEffect, useRef, ReactNode } from "react";
import { LenisRef, ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const updateGsapTicker = (time: number) => {
            const lenisInstance = lenisRef.current?.lenis;
            if (lenisInstance) {
                lenisInstance.raf(time * 1000);
            }
        };

        const lenisInstance = lenisRef.current?.lenis;
        if (lenisInstance) {
            lenisInstance.on("scroll", ScrollTrigger.update);
        } else {
            setTimeout(() => {
                lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
            }, 50);
        }

        gsap.ticker.add(updateGsapTicker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisInstance?.off("scroll", ScrollTrigger.update);
            gsap.ticker.remove(updateGsapTicker);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.2,
                duration: 1.2,
                smoothWheel: true,
                autoRaf: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
