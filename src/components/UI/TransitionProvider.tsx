"use client";

import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import React, { useEffect, useRef } from "react";

const BLOCK_SIZE = 60;

export const TransitionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const transitionGridRef = useRef<HTMLDivElement | null>(null);
    const blocksRef = useRef<HTMLDivElement[]>([]);

    const createTransitionGrid = () => {
        if (!transitionGridRef.current) return;

        const container = transitionGridRef.current;
        container.innerHTML = "";
        blocksRef.current = [];

        const gridWidth = window.innerWidth;
        const gridHeight = window.innerHeight;
        const columns = Math.ceil(gridWidth / BLOCK_SIZE);
        const rows = Math.ceil(gridHeight / BLOCK_SIZE) + 1;

        const offsetX = (gridWidth - columns * BLOCK_SIZE) / 2;
        const offsetY = (gridHeight - rows * BLOCK_SIZE) / 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const block = document.createElement("div");
                block.className = "transition-block";
                block.style.cssText = `
                    width: ${BLOCK_SIZE}px;
                    height: ${BLOCK_SIZE}px;
                    left: ${col * BLOCK_SIZE + offsetX}px;
                    top: ${row * BLOCK_SIZE + offsetY}px;
                `;

                container.appendChild(block);
                blocksRef.current.push(block);
            }
        }

        gsap.set(blocksRef.current, { opacity: 0 });
    };

    useEffect(() => {
        createTransitionGrid();
        window.addEventListener("resize", createTransitionGrid);
        return () => window.removeEventListener("resize", createTransitionGrid);
    }, []);

    return (
        <TransitionRouter
            auto
            leave={(next) => {
                const tween = gsap.to(blocksRef.current, {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.in",
                    stagger: { amount: 0.6, from: "random" },
                    onComplete: next,
                });
                return () => tween.kill();
            }}
            enter={(next) => {
                gsap.set(blocksRef.current, { opacity: 1 });
                const tween = gsap.to(blocksRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    delay: 0.2,
                    ease: "power2.in",
                    stagger: { amount: 0.6, from: "random" },
                    onComplete: next,
                });
                return () => tween.kill();
            }}
        >
            <div ref={transitionGridRef} className="transition-grid" />
            {children}
        </TransitionRouter>
    );
};
