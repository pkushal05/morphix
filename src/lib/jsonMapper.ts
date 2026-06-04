import { contentBlock, document } from "../types/document";
import { parse } from "path";

export function convertToHtmlFragment(parsedJson: document): string {
    const sectionsHtml = parsedJson.sectionOrder
        .map((sectionId) => {
            const section = parsedJson.sections[sectionId];

            const contentsHtml = section.contentOrder
                .map((blockId) => {
                    const block = section.contents[blockId];

                    return buildBlock(block);
                })
                .join("");

            return `
            <section>
                <h1>${section.title.text}</h1>
                ${contentsHtml}
            </section>
        `;
        })
        .join("");

    return sectionsHtml;
}

export function convertToHtml(parsedJson: document): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${parsedJson.documentTitle}</title>
        </head>
        <body>
            ${convertToHtmlFragment(parsedJson)}
        </body>
        </html>
    `;
}

function buildBlock(block: contentBlock): string {
    switch (block.type) {
        case "heading":
            return `<h${block.level}>${block.text}</h${block.level}>`;

        case "paragraph":
            if (block.links && block.links.length > 0) {
                const anchors = block.links
                    .map((link) => `<a href="${link.href}">${link.text}</a>`)
                    .join(" ");
                return `<p>${block.text} ${anchors}</p>`;
            }
            return `<p>${block.text}</p>`;

        case "list":
            const tag = block.ordered ? "ol" : "ul";
            const items = block.items
                .map((item) => `<li>${item}</li>`)
                .join("");

            return `<${tag}>${items}</${tag}>`;

        default:
            return "";
    }
}
