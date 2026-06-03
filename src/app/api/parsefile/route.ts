import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { convertToJson } from "@/lib/docMapper";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            throw new Error("File Not Found");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        console.time("mammoth");
        const result = await mammoth.convertToHtml({ buffer });
        console.timeEnd("mammoth");

        console.time("Conversion");
        const parsedJson = convertToJson(result.value);
        console.timeEnd("Conversion");

        return NextResponse.json({ parsedJson });
    } catch (err) {
        console.log(err);
    }
}
