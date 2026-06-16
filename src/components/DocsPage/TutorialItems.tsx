import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TutorialItems = ({ activeTab }: { activeTab: string }) => {
    if (activeTab === "walkthrough")
        return (
            <div className="pt-10 md:pt-5 md:pl-10 pl-2">
                <h1 className="text-3xl md:text-4xl font-syne font-bold text-stone-200 ">
                    End to End Walkthrough
                </h1>

                <div className="mt-10 flex flex-col gap-y-6">
                    {/* Phase 1  */}
                    <div className="max-w-3xl">
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Phase 1: Build the source document
                        </h2>

                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed text-stone-400">
                            Open Microsoft Word or Google Docs and type out your
                            course content. This layout serves as your
                            structural blueprint — using{" "}
                            <span className="font-mono text-[13px] font-semibold tracking-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 mx-1">
                                PAGE BREAK
                            </span>{" "}
                            completely isolated on its own line signals the
                            Morphix compiler to chop one flat file into clean,
                            modular learning chapters.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 border border-stone-900 bg-stone-900/20 rounded-xl">
                            <div className="relative overflow-hidden rounded-lg border border-stone-800 shadow-md shrink-0 bg-stone-950">
                                <Image
                                    src="/tutorial/morphix-tutorial.jpg"
                                    alt="Morphix DOCX Blueprint Layout Preview"
                                    width={140}
                                    height={100}
                                    className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-200"
                                />
                            </div>

                            {/* Text controls and direct action trigger */}
                            <div className="flex flex-col gap-y-2">
                                <h3 className="font-syne font-semibold text-stone-200 text-sm">
                                    Want to skip manual typing?
                                </h3>
                                <p className="text-stone-500 text-xs tracking-wide leading-relaxed">
                                    Download our pre-formatted sample blueprint
                                    file to test the parsing pipeline interface
                                    instantly.
                                </p>

                                <a
                                    href="/tutorial/morphix-tutorial.docx"
                                    download={"morphix-tutorial.docx"}
                                    className="mt-1 w-fit flex items-center gap-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-green font-mono text-xs font-medium rounded-lg shadow-sm transition-all group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-3.5 h-3.5 text-stone-500 group-hover:text-green transition-colors"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                    Download Blueprint (.docx)
                                </a>
                            </div>
                        </div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed text-stone-400">
                            This single file now contains two modules, separated
                            by the two PAGE BREAK markers. Each module&apos;s
                            first line (Module 1: ..., Module 2: ...) becomes
                            that module&apos;s title. Each bulleted list under
                            &quot;Core Learning Outcomes&quot; becomes one
                            grouped list block.
                        </p>
                    </div>

                    {/* Phase 2 */}
                    <div className="max-w-3xl">
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Phase 2: Compiling via the Upload Interface
                        </h2>

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
                                    Drag web-frameworks-course.docx into the
                                    dropzone, or click to browse and select it.
                                </li>
                                <li>
                                    Wait for the upload to finish processing.
                                </li>
                            </ol>
                        </div>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed text-stone-400">
                            You&apos;ll be redirected automatically into the
                            editor, now showing two modules: &quot;Introduction
                            to React and State&quot; and &quot;Advanced Data
                            Architecture.&quot;
                        </p>
                    </div>

                    {/* Phase 3 */}
                    <div className="max-w-3xl">
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Phase 3: Edit in the dual-pane workspace
                        </h2>
                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed text-stone-400">
                            The editor has two panes: form fields on the left, a
                            live styled preview on the right. Let&apos;s make
                            one edit to confirm round-trip editing works
                            correctly.
                        </p>

                        <div className="ml-3.5 my-5 ">
                            <ol className="tracking-wider text-[15px] md:text-base leading-relaxed [&>li]:list-decimal [&>li]:mt-2">
                                <li>
                                    In Module 1, find the second bullet under
                                    &quot;Core Learning Outcomes&quot; —
                                    <span className="px-1.5 py-0.5 mx-1 bg-stone-400/20 text-[13px] rounded-lg">
                                        Implement reactive state hooks to manage
                                        localized data shifts.
                                    </span>
                                </li>
                                <li>
                                    Click into that field and append ,{" "}
                                    <span className="px-1.5 py-0.5 mx-1 bg-stone-400/20 text-[13px] rounded-lg">
                                        with 100% test coverage to the end.
                                    </span>
                                </li>
                            </ol>
                        </div>

                        <p className="tracking-wider mt-3 text-[15px] md:text-base leading-relaxed text-stone-400">
                            Check the right pane — the preview updates
                            instantly, without a page reload, and your cursor
                            stays exactly where you left it.
                        </p>

                        <p className="tracking-wider mt-3 text-[12px] leading-relaxed text-stone-400 border-l-2 pl-4 border-stone-700">
                            What&apos;s happening under the hood: the edit
                            targets that bullet&apos;s UUID key in the content
                            hashmap, updates index 1 of its items array, and
                            re-renders only the affected preview node.
                        </p>
                    </div>

                    {/* Phase 4 */}
                    <div className="max-w-3xl">
                        <h2 className="text-xl md:text-2xl font-syne text-stone-200 font-bold">
                            Phase 4: Export
                        </h2>

                        <div className="ml-3.5 my-5 ">
                            <ol className="tracking-wider text-[15px] md:text-base leading-relaxed [&>li]:list-decimal [&>li]:mt-2">
                                <li>Go to the workspace header</li>
                                <li>Click Export</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
};
