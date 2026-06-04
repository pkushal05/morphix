import { document, topic } from "@/types/document";
import parse, { HTMLElement } from "node-html-parser";
import { isAllBold } from "./helpers";
import { NodeTypes } from "@/types/nodes";

export function convertToJson(html: string): document {
    let documentTitle: string = "";
    const sections: Record<string, topic> = {};
    const sectionOrder: string[] = [];
    let currentSectionId: string | null = null;

    let isFirstNode = true;
    let expectingTopicTitle = false;

    try {
        const root = parse(html);
        const nodes = root.childNodes;

        for (const node of nodes) {
            const el = node as HTMLElement;

            const text = el.innerText?.trim();
            if (!text || text === "") continue;

            const nodeType = detectNodeType(
                el,
                isFirstNode,
                expectingTopicTitle,
            );

            switch (nodeType) {
                case "documentTitle":
                    isFirstNode = false;
                    documentTitle = text;
                    break;

                case "pageBreak":
                    expectingTopicTitle = true;
                    continue;

                case "topicTitle":
                    const sectionId = crypto.randomUUID();

                    sections[sectionId] = {
                        title: { type: "heading", level: 1, text },
                        contents: {},
                        contentOrder: [],
                    };

                    sectionOrder.push(sectionId);
                    currentSectionId = sectionId;
                    expectingTopicTitle = false;
                    break;

                case "heading":
                    if (currentSectionId) {
                        const blockId = crypto.randomUUID();
                        sections[currentSectionId].contents[blockId] = {
                            type: "heading",
                            level: 2,
                            text,
                        };

                        sections[currentSectionId].contentOrder.push(blockId);
                    }
                    break;

                case "paragraph":
                    if (currentSectionId) {
                        const blockId = crypto.randomUUID();
                        const anchors = el.querySelectorAll("a");

                        sections[currentSectionId].contents[blockId] = {
                            type: "paragraph",
                            text,
                            ...(anchors.length > 0 && {
                                links: anchors.map((a) => ({
                                    type: "anchor",
                                    href: a.getAttribute("href") ?? "",
                                    text: a.innerText ?? "",
                                })),
                            }),
                        };

                        sections[currentSectionId].contentOrder.push(blockId);
                    }

                    break;

                case "list":
                    if (currentSectionId) {
                        const blockId = crypto.randomUUID();

                        sections[currentSectionId].contents[blockId] = {
                            type: "list",
                            ordered: el.rawTagName === "ol",
                            items: el
                                .querySelectorAll("li")
                                .map((li: HTMLElement) => {
                                    const liAnchors = li.querySelectorAll("a");

                                    return {
                                        text: li.innerText?.trim(),
                                        ...(liAnchors.length > 0 && {
                                            links: liAnchors.map((a) => ({
                                                type: "anchor",
                                                href:
                                                    a.getAttribute("href") ??
                                                    "",
                                                text: a.innerText?.trim() ?? "",
                                            })),
                                        }),
                                    };
                                }),
                        };

                        sections[currentSectionId].contentOrder.push(blockId);
                    }
                    break;
            }
        }
    } catch (err) {
        console.log(err);
    }

    return {
        documentTitle,
        sections,
        sectionOrder,
    };
}

function detectNodeType(
    node: HTMLElement,
    isFirstNode: boolean,
    expectingTopicTitle: boolean,
): NodeTypes {
    const tag = node.rawTagName?.toLowerCase();
    const text = node.innerText?.trim();

    if (!text) return "unknown";

    if (isFirstNode) return "documentTitle";

    if (text == "PAGE BREAK") return "pageBreak";

    if (expectingTopicTitle && isAllBold(node)) return "topicTitle";

    if (tag === "p" && isAllBold(node)) return "heading";

    if (tag === "p") return "paragraph";

    if (tag === "ul" || tag === "ol") return "list";

    return "unknown";
}
