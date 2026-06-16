import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import { EditorProvider } from "@/context/EditorContext";
import "./globals.css";
import Navbar from "@/components/UI/Navbar";
import SmoothScroll from "@/components/UI/SmoothScroll";
import { Footer } from "@/components/UI/Footer";
import { TransitionProvider } from "@/components/UI/TransitionProvider";

export const metadata: Metadata = {
    title: {
        default: "Morphix",
        template: "%s | Morphix",
    },
    description:
        "Transform raw document structures. Engineered explicitly for the Professional and Part-Time Learning department at Durham College.",
    applicationName: "Morphix",
    keywords: [
        "Morphix",
        "Course Compiler",
        "Durham College",
        "Professional and Part Time Learning",
        "PPL",
        "DOCX to HTML",
        "Semantic HTML Parser",
        "LMS Packaging",
    ],
    authors: [{ name: "Kushal Patel", url: "https://kushalpatel.me" }],
    creator: "Kushal Patel",

    openGraph: {
        title: "Morphix | Course Content Engineering Engine",
        description:
            "Transform raw document structures. Engineered explicitly for the Professional and Part-Time Learning department at Durham College.",
        url: "https://morphix.kushalpatel.me",
        images: [{ url: "/images/morphix-home.png" }],
        siteName: "Morphix",
        locale: "en_CA",
        type: "website",
    },

    robots: {
        index: false,
        follow: false,
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png" }],
    },
};

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    display: "swap",
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${poppins.variable} ${syne.variable} h-full antialiased`}
        >
            <body className="min-h-full overflow-x-hidden">
                {
                    <EditorProvider>
                        <SmoothScroll>
                            <TransitionProvider>
                                <Navbar />
                                {children}
                                <Footer />
                            </TransitionProvider>
                        </SmoothScroll>
                    </EditorProvider>
                }
            </body>
        </html>
    );
}
