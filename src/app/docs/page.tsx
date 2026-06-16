"use client";
import { GettingStartedItems } from "@/components/DocsPage/GettingStartedItems";
import { OverviewItems } from "@/components/DocsPage/OverviewItems";
import { TutorialItems } from "@/components/DocsPage/TutorialItems";
import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";

const DocsPage = () => {
    const [activeTab, setActiveTab] = useState("introduction");
    const [isOpen, setIsOpen] = useState(false);

    const overviewItems = [
        { id: "introduction", label: "Introduction" },
        { id: "concept-map", label: "Concept Map" },
    ];

    const gettingStartedItems = [
        { id: "blueprint", label: "1. Blueprint" },
        { id: "upload", label: "2. Upload" },
        { id: "export", label: "3. Export" },
    ];

    const tutorialItems = [{ id: "walkthrough", label: "Walkthrough" }];

    return (
        <div className="w-screen min-h-screen text-stone-400 py-18 px-7 max-w-7xl mx-auto flex md:flex-row flex-col relative">
            <aside className="hidden md:flex w-48 sticky top-18 h-screen flex-col gap-y-15 border-r border-stone-800 rounded-4xl pt-5">
                <div className="w-full">
                    <span
                        className={`mb-2 block font-semibold text-base transition-all duration-150 ${
                            overviewItems.some((item) => item.id === activeTab)
                                ? "text-blue-500"
                                : ""
                        }`}
                    >
                        Overview
                    </span>
                    <nav className="flex flex-col pl-5 gap-y-1">
                        {overviewItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`text-left text-sm transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                    activeTab === item.id
                                        ? "text-stone-50"
                                        : "text-stone-500"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="w-full">
                    <span
                        className={`mb-2 block font-semibold text-base transition-all duration-150 ${
                            gettingStartedItems.some(
                                (item) => item.id === activeTab,
                            )
                                ? "text-blue-500"
                                : ""
                        }`}
                    >
                        Getting Started
                    </span>
                    <nav className="flex flex-col pl-5 gap-y-1">
                        {gettingStartedItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`text-left text-sm transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                    activeTab === item.id ? "text-stone-50" : ""
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="w-full">
                    <span
                        className={`mb-2 block font-semibold text-base transition-all duration-150 ${
                            tutorialItems.some((item) => item.id === activeTab)
                                ? "text-blue-500"
                                : ""
                        }`}
                    >
                        Tutorial
                    </span>
                    <nav className="flex flex-col pl-5 gap-y-1">
                        {tutorialItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`text-left text-sm transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                    activeTab === item.id
                                        ? "text-stone-50"
                                        : "text-stone-500"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Mobile Nav */}
            <div className="md:hidden relative w-full h-full">
                <div className="w-full border-b border-t border-stone-700 py-4 bg-black">
                    <button
                        className={`flex items-center gap-x-2 cursor-pointer ${isOpen && "text-stone-100"}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <RxCaretRight
                            size={20}
                            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                        />
                        Menu
                    </button>
                </div>
                {/* Mobile menu open state */}
                {isOpen && (
                    <div className="py-5 pl-5 flex flex-col gap-y-5 w-full h-full border-b border-stone-700">
                        <div className="w-full">
                            <span
                                className={`mb-2 block font-semibold text-lg transition-all duration-150 ${
                                    overviewItems.some(
                                        (item) => item.id === activeTab,
                                    )
                                        ? "text-blue-500"
                                        : ""
                                }`}
                            >
                                Overview
                            </span>
                            <nav className="flex flex-col pl-5 gap-y-3">
                                {overviewItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsOpen(!isOpen);
                                        }}
                                        className={`text-left transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                            activeTab === item.id
                                                ? "text-stone-50"
                                                : "text-stone-500"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="w-full">
                            <span
                                className={`mb-2 block font-semibold text-lg transition-all duration-150 ${
                                    gettingStartedItems.some(
                                        (item) => item.id === activeTab,
                                    )
                                        ? "text-blue-500"
                                        : ""
                                }`}
                            >
                                Getting Started
                            </span>
                            <nav className="flex flex-col pl-5 gap-y-3">
                                {gettingStartedItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsOpen(!isOpen);
                                        }}
                                        className={`text-left transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                            activeTab === item.id
                                                ? "text-stone-50"
                                                : ""
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="w-full">
                            <span
                                className={`mb-2 block font-semibold text-lg transition-all duration-150 ${
                                    tutorialItems.some(
                                        (item) => item.id === activeTab,
                                    )
                                        ? "text-blue-500"
                                        : ""
                                }`}
                            >
                                Tutorial
                            </span>
                            <nav className="flex flex-col pl-5 gap-y-3">
                                {tutorialItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsOpen(!isOpen);
                                        }}
                                        className={`text-left  transition-all duration-150 cursor-pointer hover:text-stone-50 ${
                                            activeTab === item.id
                                                ? "text-stone-50"
                                                : "text-stone-500"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1">
                <OverviewItems activeTab={activeTab} />
                <GettingStartedItems activeTab={activeTab} />
                <TutorialItems activeTab={activeTab} />
            </div>
        </div>
    );
};

export default DocsPage;
