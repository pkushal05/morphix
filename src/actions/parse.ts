"use server";

import mammoth from "mammoth";
import { convertToJson } from "@/lib/docMapper";

export async function parseDocumentAction(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, error: "No document binary provided." };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await mammoth.convertToHtml({ buffer });

        const parsedJson = convertToJson(result.value);

        return { success: true, parsedJson };
    } catch (err) {
        console.error("Morphix Parse Action Failure: ", err);
        return {
            success: false,
            error:
                err instanceof Error
                    ? err.message
                    : "An unexpected document extraction error occurred.",
        };
    }
}
