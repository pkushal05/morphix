"use client"

import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UploadPage = () => {
    const router = useRouter();
    const { dispatch } = useEditor();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: Ensure it's a DOCX file
        if (
            file.type !==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            !file.name.endsWith(".docx")
        ) {
            setError("Please upload a valid .docx file.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // 1. Prepare FormData to send to our API route
            const formData = new FormData();
            formData.append("file", file);

            // 2. Hit our Next.js API route that handles Mammoth parsing
            const response = await fetch("/api/parsefile", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to parse the document.");
            }

            const data = await response.json();
            // Expecting data shape: { sections: { ... } } matching our state structure

            // 3. Load the parsed blocks into our global Editor Context
            dispatch({
                type: ActionTypes.LOAD, // Or whatever you named your initialization action
                payload: data.sections,
            });

            // 4. Send them straight to the workspace
            router.push("/editor");
        } catch (err) {
            setError("Something went wrong during parsing.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Morphix</h1>
            <p>
                Upload your educational DOCX file to begin generating your
                structured course page.
            </p>

            <div
                style={{
                    border: "2px dashed #ccc",
                    padding: "3rem",
                    textAlign: "center",
                    borderRadius: "8px",
                }}
            >
                {isLoading ? (
                    <div>
                        <p>Parsing document processing layout...</p>
                        {/* You can drop a spinner component here later */}
                    </div>
                ) : (
                    <div>
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleFileChange}
                            id="docx-upload"
                            style={{ display: "noe" }}
                        />
                        <label
                            htmlFor="docx-upload"
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: "#0070f3",
                                color: "#fff",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Choose DOCX File
                        </label>
                    </div>
                )}
            </div>

            {error && (
                <div
                    style={{
                        color: "red",
                        marginTop: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    );
};

export default UploadPage;
