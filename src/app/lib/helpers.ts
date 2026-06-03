import { HTMLElement } from "node-html-parser";

export function isBold(node: HTMLElement): boolean {
    return node.querySelector("strong") !== null;
}

export function isAllBold(node: HTMLElement): boolean {
    if (!isBold(node)) return false;

    return (
        node.innerText.trim() === node.querySelector("strong")?.innerText.trim()
    );
}

export function isPageBreak(node: HTMLElement) {
    return node
}

