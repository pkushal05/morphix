import React from "react";

export const GettingStartedItems = ({ activeTab }: { activeTab: string }) => {
    if (activeTab === "blueprint")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    BluePrint
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
};
