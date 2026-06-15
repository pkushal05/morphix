import { Link } from "next-transition-router";
import React from "react";

export const GettingStartedItems = ({ activeTab }: { activeTab: string }) => {
    if (activeTab === "blueprint")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    The DOCX Formatting BluePrint
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    <div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            The parsing engine relies entirely on visual
                            structural markers inside your Microsoft Word
                            document to map content out accurately. Before
                            uploading, ensure your{" "}
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                .docx
                            </span>{" "}
                            file follows these four baseline layout rules:
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Section Splits
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            To split your document into separate modular course
                            chapters, type the exact text string{" "}
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                PAGE BREAK
                            </span>{" "}
                            in all capital letters on its own isolated line. The
                            engine will catch this, terminate the active
                            section, and initialize a brand-new container.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Topic Headers
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            The very first line of text right after a section
                            split or at the absolute top of the document is
                            treated as your main{" "}
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                topicTitle
                            </span>
                            . This acts as the structural boundary anchor for
                            all subsequent blocks.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Semantic Sub-Headings
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Use native Word heading styles (
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                h2
                            </span>{" "}
                            through{" "}
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                h6
                            </span>
                            ). If you are working with an unstyled document, you
                            can simply make an entire paragraph line completely
                            Bold. The engine detects this custom bold layout and
                            safely falls back to a standard level: 2 heading.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Aggregated Bullet Lists
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Group your list items sequentially using standard
                            bullet points or numbered configurations. Rather
                            than processing list items as isolated paragraphs,
                            Morphix bundles the entire group into a single
                            hash-map node containing an indexed text array.
                        </p>
                    </div>
                </div>
            </div>
        );

    if (activeTab === "upload")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    Upload the document
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    <div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Once your document matches the formatting blueprint,
                            importing it into the system takes just a single
                            interaction:
                        </p>
                    </div>
                    <div className="ml-3.5">
                        <ol className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed [&>li]:list-decimal [&>li]:mt-2">
                            <li>
                                Navigate to{" "}
                                <Link
                                    href={"/upload"}
                                    className="text-stone-200 cursor-pointer underline"
                                >
                                    Upload
                                </Link>
                            </li>
                            <li>
                                Drag and drop your completed .docx file directly
                                into the active upload zone
                            </li>
                            <li>
                                The processing engine instantly takes
                                over—running the linear HTML extraction layer,
                                grouping matching blocks into their hash-map
                                slots, and assigning them persistent UUID keys.
                            </li>
                            <li>
                                As soon as processing wraps up, the application
                                automatically redirects you straight into the
                                interactive editor workspace with your live
                                content fully loaded.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        );

    if (activeTab === "export")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    Modify &amp; Download
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    <div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            The workspace canvas transforms your document into
                            an intuitive, highly editable visual control room:
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Content Editing
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Click into any heading, paragraph or list field to
                            make text adjustments on the fly. The change updates
                            are handled without re-rendering the entire page
                            architecture or resetting your text input focus.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Dynamic Live Content
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Any modifications made to your content blocks
                            instantly synchronize with a live, compiled HTML
                            preview window in real-time. As your workspace
                            dispatches localized updates to the underlying state
                            hash-map, the presentation layer re-renders the
                            final output layout on the fly, completely
                            eliminating the need for manual builds or browser
                            refreshes.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Exporting the Output
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Once your copy edits look exactly the way you want,
                            hit the Download action button on the main workspace
                            control bar. Morphix packages your live hash-map
                            registry and visual order vectors into a clean,
                            highly optimized HTML pages.{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
};
