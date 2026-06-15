import React from "react";

export const OverviewItems = ({ activeTab }: { activeTab: string }) => {
    if (activeTab === "introduction")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    Introduction
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    <div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Morphix is an automated content-pipline engine
                            designed to transform flat, unformatted academic
                            documents into highly structured and semantic web
                            pages.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Why Morphix
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Extracting curriculum data from word processors into
                            modern web applications is historically a nightmare.
                            It usually involves hours of manual copy-pasting,
                            fixing broken HTML tags, and wrestling with
                            inconsistent layouts.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            When formatting rules change or an author updates a
                            single paragraph in a Word document, the entire
                            digital layout breaks down. Morphix eliminates this
                            friction entirely. It replaces manual data entry
                            with a deterministic, predictable extraction
                            pipeline.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            How It Works
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            At its core, Morphix is a specialized compiler. It
                            ingests legacy Microsoft Word files (.docx), breaks
                            down the raw content using a deterministic
                            node-parsing pipeline, and outputs an immutable,
                            multi-tier JSON state tree. This tree renders
                            instantly into a fluid, responsive React workspace
                            canvas where the extracted content modules can be
                            edited and downloaded in real time.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Who Will Use It
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Morphix was engineered primarily to solve a
                            real-world workflow bottleneck for the student web
                            development team working within the Professional and
                            Part-time Learning (PPL) department at Durham
                            College. It is specifically tailored to ease out
                            their development workload, automating what used to
                            be hours of tedious, manual content parsing into
                            clean and semantic html pages.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            While optimized for the internal PPL team&apos;s
                            stack, anyone can use it. Whether you are an
                            open-source engineer building a custom learning
                            management system, an educator migrating legacy
                            course materials, or a developer looking to build a
                            blog/documentation site from Word files, Morphix
                            provides a flexible, platform-agnostic pipeline.
                        </p>
                    </div>
                </div>
            </div>
        );

    if (activeTab === "concept-map")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    Concept Map
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    <div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            To build with or modify Morphix effectively, it
                            helps to understand its core architecture as a
                            unidirectional data pipeline. The application does
                            not view documents as massive strings of rich text;
                            instead, it handles content as a linear collection
                            of atomic data blocks that evolve through distinct
                            lifecycles.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            The entire system relies on three architectural
                            pillars to manage content without layout desyncs or
                            slow interfaces:
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            1. The Ingestion Pipeline
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Data moves strictly in one direction. The process
                            begins with a flat, raw .docx upload. The extraction
                            layer transforms the file into generic HTML tags,
                            which are immediately caught by the node detection
                            engine.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            This engine uses strict regular expressions and
                            element parsing rules to identify structural roles
                            (such as separating a main heading from a standard
                            paragraph) before initializing the data state.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            2. The Flat Registry Lookup
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            A key mental pillar of the Morphix engine is how it
                            separates data storage from the user interface.
                            Instead of saving content blocks inside a deeply
                            nested array—which makes deep component updates
                            complex and slow—Morphix utilizes a highly efficient
                            flat hash-map structure for its central state
                            registry. Every content block is stored as a direct
                            key-value pair where the key is an automated, unique
                            UUID string.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            Therefore it gaurantees instant, constant-time
                            lookups and mutations.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            3. The Sequence Order Vector
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            To keep the page rendering perfectly from top to
                            bottom, the flat block dictionary is paired with a
                            strict tracking layout called a content order array.
                        </p>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed">
                            By keeping the text data in a flat lookup map and
                            the layout sequence in a simple array, Morphix can
                            execute localized typing updates in real time while
                            guaranteeing the final exported page retains perfect
                            visual integrity.
                        </p>
                    </div>
                </div>
            </div>
        );
};
