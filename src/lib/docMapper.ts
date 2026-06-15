import { document, topic } from "@/types/document";
import parse, { HTMLElement } from "node-html-parser";
import { isAllBold } from "@/lib/helpers";
import { DetectedNode } from "@/types/nodes";

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

            const { type, level } = detectNodeType(
                el,
                isFirstNode,
                expectingTopicTitle,
            );

            switch (type) {
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
                            level: level ?? 2,
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
): DetectedNode {
    const tag = node.rawTagName?.toLowerCase();
    const text = node.innerText?.trim();

    if (!text) return { type: "unknown" };

    if (isFirstNode) return { type: "documentTitle" };

    if (text == "PAGE BREAK") return { type: "pageBreak" };

    if (tag && /^h[1-6]$/.test(tag)) {
        const match = tag.match(/^h([1-6])$/);
        const level = (match ? parseInt(match[1], 10) : 2) as
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6;
        if (expectingTopicTitle) return { type: "topicTitle", level: 1 };
        return { type: "heading", level };
    }

    if (expectingTopicTitle && isAllBold(node))
        return { type: "topicTitle", level: 1 };

    if (tag === "p" && isAllBold(node)) return { type: "heading", level: 2 };

    if (tag === "p") return { type: "paragraph" };

    if (tag === "ul" || tag === "ol") return { type: "list" };

    return { type: "unknown" };
}
